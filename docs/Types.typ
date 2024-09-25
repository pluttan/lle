
= Типы

== Signal
Тип, представляющий возможные значения сигнала:
- `1` — сигнал "1"
- `0` — сигнал "0"
- `"x"` — неопределенный сигнал
- `"z"` — разрыв (сигнал "z")

```typescript
type Signal = 1 | 0 | "x" | "z";
```

Пример:

```typescript
const signalOne: Signal = 1;      // Сигнал "1"
const signalZero: Signal = 0;     // Сигнал "0"
const signalUnknown: Signal = "x"; // Неопределенный сигнал "x"
const signalDisconnected: Signal = "z"; // Разрыв сигнала "z"
```

== SignalArray
Массив сигналов.

```typescript
type SignalArray = Signal[];
```

Пример:

```typescript
const signalArray1: SignalArray = [1, 0, "x", "z"]; 
// Массив сигналов, содержащий 1, 0, неопределенный сигнал "x" и разрыв "z"

const signalArray2: SignalArray = [1, 1, 0, 0]; 
// Массив сигналов, состоящий из двух единиц и двух нулей
```

== StateArray
Массив состояний, который используется для описания состояния элемента при одном логическом сигнале.

- `name`: имя состояния (строка)
- `signal`: сигнал состояния (тип `Signal`)
- `SignalArray`: массив сигналов, описывающий выходные сигналы
- `StateArray`: объединение состояний элементов


```typescript
type StateArray = [string, Signal, SignalArray | StateArray];
```

Пример:

```typescript
const stateArray1: StateArray = ["E_n", 0, [0, 0, 0, 0]];
// Состояние элемента: если вход "E_n" имеет сигнал 0, то все выходы элемента будут {0, 0, 0, 0}

const stateArray2: StateArray = ["else", "x", [1, 0, 1, 0]];
// Состояние "else": если сигнал не указан явно, то выходы будут {1, 0, 1, 0}, если текущий сигнал "x"

const stateArray2: StateArray = ["else", "0", [1, 0, 1, 0]];
// Состояние "else": если сигнал не указан явно, то выходы будут {0, 0, 0, 0}
```
Пример вложенных состояний:
```typescript
const nestedStateArray: StateArray = ["control", 1, ["enable", 0, [1, 1, 1, 0]]];
// Состояние "control" с сигналом 1 и вложенное состояние "enable" с сигналом 0, результатом которого будет {1, 1, 1, 0}
```

== StateSignalArray
Массив, объединяющий способы описания сигналов:
- Массив сигналов (`SignalArray`)
- Массив состояний (`StateArray`)

```typescript
type StateSignalArray = (SignalArray | StateArray)[];
```

Пример:
```typescript
const stateSignalArray1: StateSignalArray = [
    [1, 0, 1, "z"],    // Массив сигналов
    ["E_n", 0, [0, 0, 0, 0]],  // Состояние "E_n" с сигналом 0 и выходами {0, 0, 0, 0}
    ["else", "x", [1, 1, 0, 0]] // Все остальные состояния имеют выходы {1, 1, 0, 0}, если сигнал "x"
];
```
