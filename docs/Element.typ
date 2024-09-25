
= Интерфейс IElement

== Описание методов

=== new(): IElement
Создает новый элемент без параметров.

```typescript
new(): IElement;
```

=== new(inName: string[], outName: string[], signals: StateSignalArray): IElement
Создает новый элемент с заданными входами, выходами и сигналами.

- `inName`: массив имен входов
- `outName`: массив имен выходов
- `signals`: массив сигналов, описывающий поведение элемента

Сигналы могут быть заданы последовательным перечислением или в группах. 
Особый случай: `"else"` — все необъявленные состояния принимают указанный массив сигналов при `signal = "x"`, при `signal = 0|1|"z"` все необъявленные состояния принимают `0|1|"z"` соответственно в не зависимости от массива.
Подробнее см. Типы:`StateSignalArray`.

```typescript
new(inName: string[], outName: string[], signals: StateSignalArray): IElement;
```

=== new(elementOut: IElement, elementIn: IElement): IElement
Объединяет два элемента. Выходы первого соединяются с входами второго.

- `elementOut`: элемент, чьи выходы соединяются
- `elementIn`: элемент, чьи входы соединяются

```typescript
new(elementOut: IElement, elementIn: IElement): IElement;
```

=== add(elementOut: IElement): IElement
Выходы первого элемента последовательно соединяются со входами второго 
при этом если у первого выходов больше чем у второго входов то выходы,
не соединенные со вторым элементом становятся выходами нового. Если у 
второго больше входов, то входы, не соедененные с первым элементом 

- `elementOut`: элемент, чьи выходы соединяются с входами текущего

```typescript
add(elementOut: IElement): IElement;
```

=== in(name: string, connection: IConnection): IConnection
Соединяет вход текущего элемента со входом другого при помощи механизма соединений.

- `name`: имя соединения
- `connection`: объект соединения

```typescript
in(name: string, connection: IConnection): IConnection;
```

=== in(name: string): IConnection
Соединяет вход текущего элемента по имени.

- `name`: имя соединения

```typescript
in(name: string): IConnection;
```

=== out(name: string): IConnection
Соединяет выход текущего элемента по имени.

- `name`: имя соединения

```typescript
out(name: string): IConnection;
```

=== genState(array: StateSignalArray): SignalArray
Генерирует массив сигналов для элемента на основе переданного массива состояний.

- `array`: массив состояний
- `returns`: массив сигналов (`SignalArray`)

```typescript
genState(array: StateSignalArray): SignalArray;
```

== Поля

=== in_name
Массив имен входов элемента.

```typescript
in_name: string[];
```

=== out_name
Массив имен выходов элемента.

```typescript
out_name: string[];
```

=== state
Массив состояний для элемента.

```typescript
state: SignalArray[];
```
