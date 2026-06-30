
def factor(z, skip):
   r = 1
   for i in range(skip + 1, z+1):
      r *= i
   return r

def comb(n, k):
    return factor(n, k) // factor(n - k, 1)

def comb2(n, k):
    return factor(n + k - 1, k) // factor(n - 1, 1)

def get_combination_by_index_simple(n, k, index):
    """
    Простой алгоритм: напрямую восстанавливаем a_1 <= a_2 <= ... <= a_k
    """
    total = comb(n + k - 1, k)
    if index < 0 or index >= total:
        raise ValueError(f"Индекс {index} вне диапазона")
    
    result = []
    remaining = index
    prev = 0
    for pos in range(k):
        # Перебираем возможные значения для текущей позиции
        # Текущий элемент должен быть >= prev
        for x in range(prev, n):
            # Сколько сочетаний начинаются с x на этой позиции?
            # Осталось выбрать (k - pos - 1) элементов из (n - x) типов
            count = comb(n - x + (k - pos - 1) - 1, k - pos - 1)
            
            if remaining < count:
                result.append(x)
                prev = x
                break
            else:
                remaining -= count
        else:
            # Если не нашли (не должно случиться при правильном index)
            raise RuntimeError("Ошибка в алгоритме")
    
    return result

# Тест
n, k = 4, 3
print(comb2(n, k))
for idx in range(comb(n + k - 1, k)):
    print(f"{idx}: {get_combination_by_index_simple(n, k, idx)}")
exit
def get_by_index(n, k, idx):
    result = []
    for pos in range(k):
        for x in range(n):
            count = comb2(n - x + (k - pos - 1) - 1, k - pos - 1)  # кол-во вариантов, если поставить x
            print(x, idx, count)
            if idx < count:
                result.append(x)
                break
            else:
                idx -= count
    return result

for i in range(0, comb2(4, 5)):
    print(i, get_by_index(4, 5, i))
