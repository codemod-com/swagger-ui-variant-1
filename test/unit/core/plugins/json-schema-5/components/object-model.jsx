import React from "react"
import { render } from "@testing-library/react"
import { List } from "immutable"
import ObjectModel from "core/plugins/json-schema-5/components/object-model"
// import ModelExample from "core/components/model-example"
import Immutable from "immutable"
import Model from "core/plugins/json-schema-5/components/model"
import ModelCollapse from "core/plugins/json-schema-5/components/model-collapse"
import Property from "core/components/property"
// import { inferSchema } from "core/plugins/samples/fn"

jest.mock("core/plugins/json-schema-5/components/model-collapse", () => ({children}) => <div data-testid="model-collapse">{children}</div>)
jest.mock("core/plugins/json-schema-5/components/model", () =>
  ({ schema }) => <div data-testid="model" data-name={schema.get("name")}></div>
)
jest.mock("core/components/property", () => ({propKey, propVal}) => <div data-testid="property" data-propkey={propKey} data-propval={propVal}></div>)

describe("<ObjectModel />", function() {
    const dummyComponent = () => null
    const components = {
      "JumpToPath" : dummyComponent,
      "Markdown" : dummyComponent,
      "Model" : Model,
      "ModelCollapse" : ModelCollapse,
      "Property" : Property
    }
    const props = {
      getComponent: c => components[c],
      getConfigs: () => {
        return {
          showExtensions: true
        }
      },
      isRef : false,
      specPath: List(),
      schema: Immutable.fromJS(
        {
          "properties": {
            // Note reverse order: c, b, a
            c: {
              type: "integer",
              name: "c"
            },
            b: {
              type: "boolean",
              name: "b"
            },
            a: {
              type: "string",
              name: "a"
            }
          }
        }
      ),
      specSelectors: {
        isOAS3(){
          return false
        }
      },
      className: "for-test"
    }
    const propsNullable = {
      ...props,
      schema: props.schema.set("nullable", true)
    }
    const propsMinMaxProperties = {
      ...props,
      schema: props.schema.set("minProperties", 1).set("maxProperties", 5)
    }

    it("renders a collapsible header", function(){
      const { queryAllByTestId } = render(<ObjectModel {...props}/>)
      expect(queryAllByTestId("model-collapse").length).toEqual(1)
    })

    it("renders the object properties in order", function() {
        const { queryAllByTestId } = render(<ObjectModel {...props}/>)
        const renderedModel = queryAllByTestId("model")
        expect(renderedModel.length).toEqual(3)
        expect(renderedModel[0].getAttribute("data-name")).toEqual("c")
        expect(renderedModel[1].getAttribute("data-name")).toEqual("b")
        expect(renderedModel[2].getAttribute("data-name")).toEqual("a")

    })

    it("doesn't render `nullable` for model when it absent", function() {
      const { queryAllByTestId } = render(<ObjectModel {...props}/>)
      const renderedProperties = queryAllByTestId("property")
      expect(renderedProperties.length).toEqual(0)
    })

    it("renders `nullable` for model", function() {
      const { queryAllByTestId } = render(<ObjectModel {...propsNullable}/>)
      const renderedProperties = queryAllByTestId("property")
      expect(renderedProperties.length).toEqual(1)
      expect(renderedProperties[0].getAttribute("data-propkey")).toEqual("nullable")
      expect(renderedProperties[0].getAttribute("data-propval")).toEqual("true")
    })

    it("doesn't render `minProperties` and `maxProperties` if they are absent", function() {
      const { queryAllByTestId } = render(<ObjectModel {...props}/>)
      const renderedProperties = queryAllByTestId("property")
      expect(renderedProperties.length).toEqual(0)
    })

    it("renders `minProperties` and `maxProperties` if they are defined", function() {
      const { queryAllByTestId } = render(<ObjectModel {...propsMinMaxProperties}/>)
      const renderProperties = queryAllByTestId("property")
      expect(renderProperties.length).toEqual(2)
      expect(renderProperties[0].getAttribute("data-propkey")).toEqual("minProperties")
      expect(renderProperties[0].getAttribute("data-propval")).toEqual("1")
      expect(renderProperties[1].getAttribute("data-propkey")).toEqual("maxProperties")
      expect(renderProperties[1].getAttribute("data-propval")).toEqual("5")
    })
})
