/**
 * @jest-environment jsdom
 */

const fs = require("fs");
require("@testing-library/jest-dom");
const domTesting = require("@testing-library/dom");
const userEvent = require("@testing-library/user-event").default;

global.window.alert = jest.fn();

function initDomFromFiles(htmlPath, jsPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  document.open();
  document.write(html);
  document.close();

  jest.isolateModules(function () {
    require(jsPath);
  });
}

test("Clicking the add values button, creates a new pair of x and y input fields ", async () => {
  initDomFromFiles(
    `${__dirname}/../line/line.html`,
    `${__dirname}/../line/line.js`
  );

  let xInputs = domTesting.getAllByLabelText(document, "X");
  let yInputs = domTesting.getAllByLabelText(document, "Y");

  const addCoords = domTesting.getByText(document, "+");

  const user = userEvent.setup();

  expect(xInputs.length).toBe(1);
  expect(yInputs.length).toBe(1);

  await user.click(addCoords);
  await user.click(addCoords);

  xInputs = domTesting.getAllByLabelText(document, "X");
  yInputs = domTesting.getAllByLabelText(document, "Y");

  expect(xInputs.length).toBe(3);
  expect(yInputs.length).toBe(3);
});

test("Clicking the add values button does not change values of previous inputs ", async () => {
  initDomFromFiles(
    `${__dirname}/../line/line.html`,
    `${__dirname}/../line/line.js`
  );

  let xInput = domTesting.getByLabelText(document, "X");
  let yInput = domTesting.getByLabelText(document, "Y");

  const addCoords = domTesting.getByText(document, "+");

  const user = userEvent.setup();

  await user.type(xInput, "7");
  await user.type(yInput, "9");

  await user.click(addCoords);
  await user.click(addCoords);

  expect(xInput).toHaveValue(7);
  expect(yInput).toHaveValue(9);

  let clear = domTesting.getByText(document, "Clear chart data");

  await user.click(clear);
});

test("Generating a chart without entering x and y labels alerts the user ", async () => {
  initDomFromFiles(
    `${__dirname}/../line/line.html`,
    `${__dirname}/../line/line.js`
  );

  let xInput = domTesting.getByLabelText(document, "X");
  let yInput = domTesting.getByLabelText(document, "Y");

  const genChart = domTesting.getByText(document, "Generate chart");

  const user = userEvent.setup();

  await user.type(xInput, "7");
  await user.type(yInput, "9");

  global.window.alert.mockClear();

  await user.click(genChart);

  expect(window.alert).toHaveBeenCalledWith(
    "Error: Must specify a label for both X and Y!"
  );

  let clear = domTesting.getByText(document, "Clear chart data");

  await user.click(clear);
});

test("Generating a chart without entering x and y values alerts the user ", async () => {
  initDomFromFiles(
    `${__dirname}/../line/line.html`,
    `${__dirname}/../line/line.js`
  );

  let xInput = domTesting.getByLabelText(document, "X label");
  let yInput = domTesting.getByLabelText(document, "Y label");

  const genChart = domTesting.getByText(document, "Generate chart");

  const user = userEvent.setup();

  await user.type(xInput, "Cats");
  await user.type(yInput, "Dogs");

  global.window.alert.mockClear();

  await user.click(genChart);

  expect(window.alert).toHaveBeenCalledWith("Error: No data specified!");

  let clear = domTesting.getByText(document, "Clear chart data");

  await user.click(clear);
});

test("Clicking the clear chart button resets all x and y values", async () => {
  initDomFromFiles(
    `${__dirname}/../line/line.html`,
    `${__dirname}/../line/line.js`
  );

  let xInputs = domTesting.getAllByLabelText(document, "X");
  let yInputs = domTesting.getAllByLabelText(document, "Y");

  const addCoords = domTesting.getByText(document, "+");

  const user = userEvent.setup();

  await user.type(xInputs[xInputs.length - 1], "7");
  await user.type(yInputs[yInputs.length - 1], "9");

  await user.click(addCoords);

  await user.type(xInputs[xInputs.length - 1], "7");
  await user.type(yInputs[yInputs.length - 1], "9");

  xInputs = domTesting.getAllByLabelText(document, "X");
  yInputs = domTesting.getAllByLabelText(document, "Y");

  expect(xInputs.length).toBe(2);
  expect(yInputs.length).toBe(2);

  let clear = domTesting.getByText(document, "Clear chart data");

  await user.click(clear);

  xInputs = domTesting.getAllByLabelText(document, "X");
  yInputs = domTesting.getAllByLabelText(document, "Y");

  expect(xInputs.length).toBe(1);
  expect(yInputs.length).toBe(1);

  expect(xInputs[xInputs.length - 1]).toHaveValue(null);
  expect(yInputs[yInputs.length - 1]).toHaveValue(null);
});

test("Clicking the clear chart button resets x and y labels", async () => {
  initDomFromFiles(
    `${__dirname}/../line/line.html`,
    `${__dirname}/../line/line.js`
  );

  let xInput = domTesting.getByLabelText(document, "X label");
  let yInput = domTesting.getByLabelText(document, "Y label");

  const user = userEvent.setup();

  await user.type(xInput, "Cats");
  await user.type(yInput, "Dogs");

  let clear = domTesting.getByText(document, "Clear chart data");

  await user.click(clear);

  expect(xInput).toHaveValue("");
  expect(yInput).toHaveValue("");
});

test("Clicking the clear chart button resets chart title", async () => {
  initDomFromFiles(
    `${__dirname}/../line/line.html`,
    `${__dirname}/../line/line.js`
  );

  let chartTitle = domTesting.getByLabelText(document, "Chart title");

  const user = userEvent.setup();

  await user.type(chartTitle, "Cats");

  let clear = domTesting.getByText(document, "Clear chart data");

  await user.click(clear);

  expect(chartTitle).toHaveValue("");
});

test("Clicking the clear chart button resets chart color", async () => {
  initDomFromFiles(
    `${__dirname}/../line/line.html`,
    `${__dirname}/../line/line.js`
  );

  let chartColor = domTesting.getByLabelText(document, "Chart color");

  const user = userEvent.setup();

  userEvent.type(chartColor, "#FFFFFF");

  let clear = domTesting.getByText(document, "Clear chart data");

  await user.click(clear);

  expect(chartColor.value).toBe("#ff4500");
});
