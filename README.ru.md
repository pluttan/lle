<div align="center">

# lle

**TypeScript-библиотека для моделирования, соединения и визуализации логических элементов с симуляцией гонок сигналов**

[![License](https://img.shields.io/badge/license-MIT-2C2C2C?style=for-the-badge&labelColor=1E1E1E)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.5-3178C6?style=for-the-badge&logo=typescript&labelColor=1E1E1E)](https://www.typescriptlang.org)
[![npm](https://img.shields.io/badge/npm-ldamle-CB3837?style=for-the-badge&logo=npm&labelColor=1E1E1E)](https://www.npmjs.com/package/ldamle)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&labelColor=1E1E1E)](https://nodejs.org)

</div>

Комплексный инструмент для схемотехников: создавать, соединять и комбинировать логические элементы, отрисовывать схемы и моделировать гонки сигналов — всё через простой программный API. Статические и динамические элементы, гибкие соединения с несколькими входами, граф элементов и тактово-точный движок моделирования объединены в одну библиотеку, опубликованную в npm под именем `ldamle`.

## ■ Возможности

- ❖ **Статические элементы** — задание входов, выходов и полной таблицы истинности зависимости выходных сигналов от входных
- ❖ **Динамические элементы / Генераторы** — генерируют меандр заданной частоты; к генераторам подключаются статические элементы, образуя сложные динамические схемы
- ❖ **Набор стандартных элементов** (`lle.stde`) — готовые вентили (AND, OR, NOT и др.) доступны из коробки
- ❖ **Модель соединений** — типизированные объекты `Connection` передают состояние сигнала между элементами; у соединения один выход и произвольное число входов
- ❖ **Граф элементов** — по каждому элементу строится ориентированный граф всех связанных элементов вверх и вниз по цепи; требует хотя бы одного генератора
- ❖ **Потактовая симуляция** — топологическая очередь, полученная из графа, вычисляет состояние каждого элемента на каждом такте целевой частоты и воспроизводит гонки сигналов
- ❖ **Визуализация графа** — D3-вид рисует SVG-граф элементов в браузере через локальный сервер на Express
- ❖ **Полное покрытие тестами** — Jest-наборы с инструментацией nyc покрывают каждый класс и фабрику; отчёты о покрытии опубликованы на GitHub Pages

## ■ Стек

<div align="center">

| Компонент | Технология |
|-----------|-----------|
| Язык | TypeScript 5.5 |
| Среда выполнения | Node.js |
| Визуализация | D3.js (разметка SVG-графа) |
| Canvas-рендеринг | React + react-konva |
| Dev-сервер | Express 4 |
| Тестирование | Jest + nyc (покрытие) |
| Сборщик | Webpack 5 |
| Документация | TypeDoc + docsify |

</div>

## ■ Как работает

```
1. Создаются экземпляры Element / Generator, соединяемые через объекты Connection
2. ElementGraph обходит всю цепочку зависимостей от каждого генератора
3. Граф линеаризуется в топологическую очередь вычисления
4. Model шагает по очереди на каждом такте, распространяя состояния сигналов
5. Гонки сигналов возникают естественным образом из порядка обхода и задержек вентилей
6. graphView отрисовывает дерево зависимостей как масштабируемый D3 SVG в браузере
```

## ■ Установка и запуск

```sh
# Создать новый Node-проект
npm init

# Добавить библиотеку
npm install ldamle
```

```js
import * as lle from 'ldamle';

// Стандартный вентиль AND
const and = new lle.stde.AND();

// Подключить генератор и запустить модель
const clk = new lle.Generator(1000); // меандр 1 кГц
```

> Полный справочник API: [pluttan.github.io/lle/docs/documentation/](https://pluttan.github.io/lle/docs/documentation/)

## ■ Покрытие тестами

Все классы покрыты Jest-наборами с инструментацией nyc. Отчёты опубликованы на GitHub Pages:

- [Полное покрытие](https://pluttan.github.io/lle/test/coverage/all/)
- [Класс Connection](https://pluttan.github.io/lle/test/coverage/connection/)
- [Классы Element и Generator](https://pluttan.github.io/lle/test/coverage/element/)
- [Класс ElementGraph](https://pluttan.github.io/lle/test/coverage/elementgraph/)
- [Типы и фабрики](https://pluttan.github.io/lle/test/coverage/general/)

## ■ License

MIT © [pluttan](https://github.com/pluttan)
