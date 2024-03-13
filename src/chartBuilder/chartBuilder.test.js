/**
 * @jest-environment jsdom
 */

const fs = require("fs");
require("@testing-library/jest-dom");
const domTesting = require("@testing-library/dom");
const userEvent = require("@testing-library/user-event").default;

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
});
