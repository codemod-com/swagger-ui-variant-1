import React from "react"
import { render } from "@testing-library/react"
import ModelExample from "core/plugins/json-schema-5/components/model-example"
import ModelComponent from "core/plugins/json-schema-5/components/model-wrapper"

describe("<ModelExample/>", function(){
  let components, props

  let exampleSelectedTestInputs = [
    { defaultModelRendering: "model", isExecute: true },
    { defaultModelRendering: "example", isExecute: true },
    { defaultModelRendering: "example", isExecute: false },
    { defaultModelRendering: "othervalue", isExecute: true },
    { defaultModelRendering: "othervalue", isExecute: false }
  ]

  let modelSelectedTestInputs = [
    { defaultModelRendering: "model", isExecute: false }
  ]

  beforeEach(() => {
    components = {
      ModelWrapper: ModelComponent,
      Model: ({expandDepth}) => <div data-expand-depth={expandDepth}></div>,
    }

    props = {
      getComponent: (c) => {
          return components[c]
      },
      specSelectors: {
        isOAS3: () => false
      },
      schema: {},
      example: "{\"example\": \"value\"}",
      isExecute: false,
      getConfigs: () => ({
        defaultModelRendering: "model",
        defaultModelExpandDepth: 1
      })
    }
  })


  it("renders model and example tabs", function(){
    // When
    let wrapper = render(<ModelExample {...props}/>)

    // Then should render tabs
    expect(wrapper.getByRole("tablist")).toBeInTheDocument()

    let tabs = wrapper.getAllByRole("tab")
    expect(tabs.length).toEqual(2)
    tabs.forEach((node) => {
      expect(node).toBeInTheDocument()
      expect(node.tagName).toEqual("BUTTON")
      expect(node).toHaveClass("tablinks")
    })
    expect(tabs[0]).toHaveTextContent("Example Value")
    expect(tabs[1]).toHaveTextContent("Model")
  })

  exampleSelectedTestInputs.forEach(function(testInputs) {
    it("example tab is selected if isExecute = " + testInputs.isExecute + " and defaultModelRendering = " + testInputs.defaultModelRendering, function(){
      // When
      props.isExecute = testInputs.isExecute
      props.getConfigs = () => ({
        defaultModelRendering: testInputs.defaultModelRendering,
        defaultModelExpandDepth: 1
      })
      let wrapper = render(<ModelExample {...props}/>)

      // Then
      let tabs = wrapper.getAllByRole("tab")

      let exampleTab = tabs[0]
      expect(exampleTab.parentElement).toHaveClass("active")
      let modelTab = tabs[1]
      expect(modelTab.parentElement).not.toHaveClass("active")

      expect(wrapper.getByRole("tabpanel")).toBeInTheDocument()
      expect(wrapper.getByRole("tabpanel")).toHaveTextContent(props.example)
    })
  })

  modelSelectedTestInputs.forEach(function(testInputs) {
    it("model tab is selected if isExecute = " + testInputs.isExecute + " and defaultModelRendering = " + testInputs.defaultModelRendering, function(){
      // When
      props.isExecute = testInputs.isExecute
      props.getConfigs = () => ({
        defaultModelRendering: testInputs.defaultModelRendering,
        defaultModelExpandDepth: 1
      })
      let wrapper = render(<ModelExample {...props}/>)

      // Then
      let tabs = wrapper.getAllByRole("tab")

      let exampleTab = tabs[0]
      expect(exampleTab.parentElement).not.toHaveClass("active")
      let modelTab = tabs[1]
      expect(modelTab.parentElement).toHaveClass("active")

      expect(wrapper.getByRole("tabpanel")).toBeInTheDocument()
      expect(wrapper.getByRole("tabpanel").querySelector("[data-expand-depth='1']")).toBeInTheDocument()
    })
  })

  it("passes defaultModelExpandDepth to ModelComponent", function(){
      // When
      let expandDepth = 0
      props.isExecute = false
      props.getConfigs = () => ({
        defaultModelRendering: "model",
        defaultModelExpandDepth: expandDepth
      })
      let wrapper = render(<ModelExample {...props}/>)

      // Then
      expect(wrapper.getByRole("tabpanel").querySelector("[data-expand-depth='0']")).toBeInTheDocument()
  })

})
