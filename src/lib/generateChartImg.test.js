//test file for generateChartImg.js

const generateChartImg = require("./generateChartImg")
test("generateChartImg", async () => {
    const data = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 4 },
        { x: 4, y: 5 },
        { x: 5, y: 6 }
    ]
    const type = "line"
    const xLabel = "X"
    const yLabel = "Y"
    const title = "Test Chart"
    const color = "red"

    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
    //from inspecting in the browser we can see that the url begins with "blob:"
    expect(imgUrl.startsWith("blob:")).toBe(true)
})