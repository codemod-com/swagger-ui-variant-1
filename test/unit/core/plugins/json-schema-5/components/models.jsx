import React from "react"
import { render } from "@testing-library/react"
import { fromJS, Map } from "immutable"
import Models from "core/plugins/json-schema-5/components/models"

describe("<Models/>", function(){
  const makeDummyComponent = (name) => 
    ({children, expandDepth}) => <div data-testid={name} data-expand-depth={expandDepth}>{children}</div>
  // Given
  let components = {
    Collapse: makeDummyComponent("Collapse"),
    ModelWrapper: makeDummyComponent("ModelWrapper"),
    JumpToPath: makeDummyComponent("JumpToPath"),
    Model: makeDummyComponent("Model"),
    ModelCollapse: makeDummyComponent("ModelCollapse"),
    ArrowUpIcon: makeDummyComponent("ArrowUpIcon"),
    ArrowDownIcon: makeDummyComponent("ArrowDownIcon")
  }
  let props = {
    getComponent: (c) => {
        return components[c]
    },
    specSelectors: {
      isOAS3: () => false,
      specJson: () => Map(),
      definitions: function() {
        return fromJS({
          def1: {},
          def2: {}
        })
      },
      specResolvedSubtree: () => {}
    },
    layoutSelectors: {
      isShown: jest.fn()
    },
    layoutActions: {
      readyToScroll: jest.fn()
    },
    getConfigs: () => ({
      docExpansion: "list",
      defaultModelsExpandDepth: 0
    })
  }


  it("passes defaultModelsExpandDepth to ModelWrapper", function(){
    // When
    const { getAllByTestId } = render(<Models {...props}/>)

    // Then should render tabs
    expect(getAllByTestId("Collapse").length).toEqual(1)
    expect(getAllByTestId("ModelWrapper").length).toBeGreaterThan(0)
    getAllByTestId("ModelWrapper").forEach((modelWrapper) => {
      expect(modelWrapper.getAttribute("data-expand-depth")).toBe("0")
    })
  })

})
