import React from "react"
import { render } from "@testing-library/react"
import { fromJS } from "immutable"
import PrimitiveModel from "core/plugins/json-schema-5/components/primitive-model"
import ModelCollapse from "core/plugins/json-schema-5/components/model-collapse"

jest.mock(
  "core/plugins/json-schema-5/components/model-collapse",
  () => ({ children, title }) => (
    <div data-testid="model-collapse">
      <div data-testid="model-collapse-title">
        {title}
      </div>
      {children}
    </div>
  )
)

describe("<PrimitiveModel/>", function () {
    const dummyComponent = () => null
    const components = {
      Markdown: dummyComponent,
      EnumModel: dummyComponent,
      Property: dummyComponent,
      "ModelCollapse" : ModelCollapse,
    }
    const props = {
      getComponent: c => components[c],
      getConfigs: () => ({
        showExtensions: false
      }),
      name: "Name from props",
      depth: 1,
      schema: fromJS({
        type: "string",
        title: "Custom model title"
      }),
      expandDepth: 1
    }

    it("renders the schema's title", function () {
      // When
      const { getByTestId } = render(<PrimitiveModel {...props} />)
      const renderedModelCollapse = getByTestId("model-collapse")
      const renderedModelCollapseTitle = getByTestId("model-collapse-title")
      expect(renderedModelCollapse).toContainElement(renderedModelCollapseTitle)
      expect(renderedModelCollapseTitle).toHaveTextContent("Custom model title")
    })

    it("falls back to the passed-in `name` prop for the title", function () {
      // When
      props.schema = fromJS({
        type: "string"
      })
      const { getByTestId } = render(<PrimitiveModel {...props} />)
      const renderedModelCollapse = getByTestId("model-collapse")
      const renderedModelCollapseTitle = getByTestId("model-collapse-title")
      expect(renderedModelCollapse).toContainElement(renderedModelCollapseTitle)
      expect(renderedModelCollapseTitle).toHaveTextContent("Name from props")
    })

    it("renders a collapsible header", function(){
      const { getByTestId } = render(<PrimitiveModel {...props}/>)
      const renderedModelCollapse = getByTestId("model-collapse")

      expect(renderedModelCollapse).toBeInTheDocument()
    })
})
