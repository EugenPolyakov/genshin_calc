import { isDecimal, isPercent } from "../classes/Stats";

export function formatNumber(value, opts) {
    opts ||= {};
    let result = value || 0;
    let minimal = parseFloat("0." + "".padEnd(opts.digits | 0, '0') + '1');

    if (Math.abs(value) < minimal) {
        return opts.zero ? (typeof opts.zero == "string" ? opts.zero : (opts.percent ? '0%' : '0')) : '';
    }

    if (opts.digits || opts.percent) {
        result += minimal / 100;
        let opt = { maximumFractionDigits: opts.digits || 1 };
        if (!opts.no_decimal_zero)
            opt.minimumFractionDigits = opt.maximumFractionDigits;

        result = result.toLocaleString(UI.Lang.getLocale(), opt);
    } else {
        result = Math.round(result);

        if (opts.minimize) {
            if (result > 10000000) {
                result = (result / 1000000).toLocaleString(UI.Lang.getLocale(), { maximumFractionDigits: 2 }) + 'm'
            } else if (result > 1000000) {
                result = (result / 1000000).toLocaleString(UI.Lang.getLocale(), { maximumFractionDigits: 3 }) + 'm'
            }
        } else
            result = result.toLocaleString(UI.Lang.getLocale());
    }

    if (opts.signed) {
        if (value < 0) {
            if (result == '0') {
                result = '-0';
            }
        } else {
            result = '+' + result;
        }
    }

    if (opts.percent) {
        result = result + '%';
    }

    return result;
}

export function formatStat(stat, value, opts) {
    opts ||= {};
    opts.percent = isPercent(stat);
    if (opts.digits === undefined && isDecimal(stat))
        opts.digits = 1;

    return formatNumber(value, opts);
}

export function makeShareUrl(hash) {
    let shareUrl = window.location.toString();
    shareUrl = shareUrl.replace(/#.*$/, '');
    shareUrl += '#'+ hash;
    return shareUrl;
}

export function waitForCondition(condition, callback, timer) {
    let inteval = setInterval(() => {
        if (condition()) {
            clearInterval(inteval);
            callback();
        }
    }, timer || 100);
}
