import itertools
import re
import logging

logger = logging.getLogger(__name__)


class SentenceMismatch(Exception):
    def __init__(self, value: str = None, new_value: str = None) -> None:
        self.value = value
        self.new_value = new_value


def clean_number(text: str):
    text = re.sub(r',(\d\d\d)', '\\1', text)
    text = re.sub(r',', '.', text)
    text = re.sub(r'[^\d\.]', '', text)
    return text


class TemplateSentence:
    def __init__(self, source: str):
        self.source = source
        self.values = []

        def repalce_callback(match):
            self.values.append(match.group(1))
            return '{value_%d}' % (len(self.values),)

        self.formatted = re.sub(r'\b(\d+(?:(?:,|\.| )\d+)?\%?)', repalce_callback, source)

    def apply(self, values: list):
        #logger.error(f'\n------------------------------\n{self.formatted}')
        if len(self.values) != len(values):
            logger.error(f'Template Sentence values length mismatch:({len(self.values)} != {len(values)})')
            logger.error(f'\n------------------------------\n{self.source}')
            logger.error(f'\n------------------------------\n{self.formatted}')
            logger.error(f'\n------------------------------\n{self.values}')
            logger.error(f'\n------------------------------\n{values}')
            logger.error(f'\n------------------------------\n')

        index = 0
        result = self.formatted

        xx= ''
        if xx:
            print( xx =='ignore')

        for (own_value, ext_value) in itertools.zip_longest(self.values, values):
            ext_value = self.check_value(own_value, ext_value)
            index += 1
            if len(ext_value) == 1:
                leaf = '{value}'
            else:
                leaf = ext_value.pop(0)
            val = ext_value.pop()
            if val == 'ignore':
                val = leaf.replace('{value}', own_value)
            elif val:
                val = leaf.replace('{value}', '%%{%s}' % val)
            else:
                val = leaf.replace('{value}', 'value{%s}' % own_value)
            for leaf in ext_value:
                val = leaf.replace('{value}', '%%{%s}' % val)

            result = result.replace('{value_%d}' % index, val)
        #logger.error(f'\n------------------------------\n{result}')
        return result

    def check_value(self, own_value, ext_value):
        if not ext_value:
            return [ext_value]
        parts = ext_value.split(':')
        if len(parts) < 2:
            return [ext_value]

        if clean_number(own_value) != clean_number(parts[0]):
            raise SentenceMismatch(ext_value, own_value)

        return parts[1:]


class TemplateString:
    def __init__(self, source: str):
        self.source = source
        self.sentences = []

        text = re.sub(r'\. (([a-zа-я]*\{)*[A-ZА-Я])', ".\n\\1", source)
        for item in re.split(r'\n', text):
            self.sentences.append(TemplateSentence(item))

    def apply(self, values: list, res_index=None):
        if len(self.sentences) != len(values):
            logger.error('Template sentence length mismatch\n~~~~~~~~~~~~~~~~~~~~~~~\n')
            logger.error(f'{values}\n~~~~~~~~~~~~~~~~~~~~~~~\n')
            self.dump()
            logger.error('\n~~~~~~~~~~~~~~~~~~~~~~~\n')
            return ''

        result = []
        for (item, data) in zip(self.sentences, values):
            try:
                result.append(item.apply(data))
            except SentenceMismatch as e:
                logger.error(f'Template sentence value mismatch for {e.value} new value is {e.new_value} is source \n{self.source}')
                return ''

        if isinstance(res_index, list):
            res_list = []
            for indices in res_index:
                r = []
                for index in indices:
                    if isinstance(index, str):
                        r.append(index)
                    else:
                        r.append(result[index])
                res_list.append(' '.join(r))
            return res_list
        return ' '.join(result)

    def dump(self):
        logger.error(self.source)
        for item in self.sentences:
            logger.error(item.values)


class Template:
    def __init__(self, replace={}, names=[], sentences=[], patterns=[], keywords=[], skills={}, results=None):
        self.replace = replace
        self.names = names
        self.sentences = sentences
        self.patterns = patterns
        self.keywords = keywords
        # results отвечает за объединение, каждый элемент - список последовательностей которые нужно объединить в одну
        # если отсутсвует, то все последовательности будут объеденены в одну, нумерация сквозная
        self.results = results
        self.skills = skills

    def process(self, string: str):
        result = string
        result = self.apply_replace(result)
        result = self.apply_keywords(result)
        result = self.apply_skills(result)
        result = self.apply_patterns(result)
        sen_result = self.apply_sentences(result)
        if isinstance(sen_result, list):
            ret = []
            for sent in sen_result:
                ret.append(self.apply_names(sent))
            return ret
        else:
            return self.apply_names(sen_result)

    def apply_replace(self, string):
        result = string
        for key in self.replace:
            result = result.replace(key, self.replace[key])
        return result

    def apply_sentences(self, string):
        result = string
        if self.sentences:
            result = TemplateString(result).apply(self.sentences, self.results)
        return result

    def apply_names(self, string):
        return self.apply_custom_names(string, self.names)
    
    def apply_custom_names(self, string, names):
        result = string
        for name in names:
        #     result = re.sub(r'(?:^|([^\{])\b)' + re.escape(name) + r'(?:\b([^\}])|$)', '\\1name{%s}\\2' % name, result)
            idx = 0
            cnt = 1
            rx = re.compile(r'(^[^\{]*?|}[^\{]*?|{[^\{]*?})+\b(' + name + r')(?=\b[^\}]|$)')
            while cnt > 0:
                (result, cnt) = rx.subn('\\1name{\\2}', result)
                idx+=1
                if idx > 100:
                    break
        return result

    def apply_keywords(self, string):
        result = string
        for keyword in self.keywords:
        #     result = re.sub(r'(?:^|([^\{])\b)(' + re.escape(keyword[0]) + r')(?:$|\b([^\}]))', '\\1' + keyword[1] + '{\\2}\\3', result)
            idx = 0
            cnt = 1
            rx = re.compile(r'(^[^\{]*?|}[^\{]*?|{[^\{]*?})+\b(' + keyword[0] + r')(?=\b[^\}]|$)')
            while cnt > 0:
                (result, cnt) = rx.subn('\\1' + keyword[1] + '{\\2}', result)
                idx+=1
                if idx > 100:
                    break
        return result

    def apply_patterns(self, string):
        result = string
        for pattern in self.patterns:
            result = re.sub(pattern[0], pattern[1], result)
        return result

    def apply_skills(self, string):
        result = string
        for skill in self.skills:
            for name in self.skills[skill]:
                result = result.replace(f'skill{{{name}}}', f'skill{{{skill}:{name}}}')
        return result

class WeaponTemplate(Template):
    def __init__(self, replace={}, names=[], sentences=[], patterns=[], keywords=[], skills={}, results=None, extracted_names=None):
        super().__init__(replace, names, sentences, patterns, keywords, skills, results)
        self.extracted_names = extracted_names

    def process(self, string: str):
        result = string
        result = self.apply_replace(result)
        result = self.apply_keywords(result)
        result = self.apply_skills(result)
        result = self.apply_patterns(result)
        sen_result = self.apply_sentences(result)
        out = {'names': [], 'descr': []}
        if isinstance(sen_result, list):
            ret = []
            if isinstance(self.extracted_names, list):
                for idx, v in enumerate(sen_result):
                    if idx in self.extracted_names:
                        out['names'].append(v)
                    else:
                        out['descr'].append(v)

                if len(out['names']) > 0:
                    for sent in out['descr']:
                        ret.append(self.apply_custom_names(sent, out['names']))
                    out['descr'] = []
            else:
                ret = sen_result

        else:
            ret = [sen_result]

        for sent in ret:
            out['descr'].append(self.apply_names(sent))
        return out


class TemplateList:
    def __init__(self, **templates):
        self.templates = dict(**templates)

    def process(self, lang, name, string):
        result = string
        default = self.templates.get(f'default_{lang}')
        selected = self.templates.get(f'{name}_{lang}') or self.templates.get(name)
        if default:
            result = default.process(result)
        if selected:
            result = selected.process(result)
        return result
