//test file for generateChartImg.js

const generateChartImg = require("./generateChartImg")

describe("Generate Chart Image Tests", () => {

    test("generate line chart with sample data", async () => {
        //arrange
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

        //act
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

        //assert
        //from inspecting in the browser we can see that the url begins with "blob:"
        expect(imgUrl.startsWith("blob:")).toBe(true)
    })

    test("generate bar chart with sample data", async () => {
        //arrange
        const data = [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 4 },
            { x: 4, y: 5 },
            { x: 5, y: 6 }
        ]
        const type = "bar"
        const xLabel = "X"
        const yLabel = "Y"
        const title = "Test Chart"
        const color = "red"

        //act
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

        //assert
        //from inspecting in the browser we can see that the url begins with "blob:"
        expect(imgUrl.startsWith("blob:")).toBe(true)
    })

    test("generate scatter chart with sample data", async () => {
        //arrange
        const data = [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 4 },
            { x: 4, y: 5 },
            { x: 5, y: 6 }
        ]
        const type = "scatter"
        const xLabel = "X"
        const yLabel = "Y"
        const title = "Test Chart"
        const color = "red"

        //act
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

        //assert
        //from inspecting in the browser we can see that the url begins with "blob:"
        expect(imgUrl.startsWith("blob:")).toBe(true)
    })

})
