import React from "react"
import Immutable, { List } from "immutable"
import { Select, Input, TextArea } from "core/components/layout-utils"
import { render } from "@testing-library/react"
import * as JsonSchemaComponents from "core/plugins/json-schema-5/components/json-schema-components"

const components = {...JsonSchemaComponents, Select, Input, TextArea}

const getComponentStub = (name) => {
  if(components[name]) return components[name]

  return null
}

describe("<JsonSchemaComponents.JsonSchemaForm/>", function(){
  describe("strings", function() {
    it("should render the correct options for a string enum parameter", function(){

      let props = {
        getComponent: getComponentStub,
        value: "",
        onChange: () => {},
        keyName: "",
        fn: {},
        schema: Immutable.fromJS({
          type: "string",
          enum: ["one", "two"]
        })
      }

      let wrapper = render(<JsonSchemaComponents.JsonSchemaForm {...props}/>)

      expect(wrapper.getByRole("combobox")).toBeInTheDocument()
      expect(wrapper.getAllByRole("option").length).toEqual(3)
      expect(wrapper.getByRole("option", { name: "--" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "one" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "two" })).toBeInTheDocument()
    })

    it("should render a string enum as disabled when JsonSchemaForm is disabled", function(){

      let props = {
        getComponent: getComponentStub,
        value: "",
        onChange: () => {},
        keyName: "",
        fn: {},
        schema: Immutable.fromJS({
          type: "string",
          enum: ["one", "two"]
        }),
        disabled: true
      }

      let wrapper = render(<JsonSchemaComponents.JsonSchemaForm {...props}/>)

      expect(wrapper.getByRole("combobox")).toBeDisabled()
    })


    it("should render the correct options for a required string enum parameter", function(){

      let props = {
        getComponent: getComponentStub,
        value: "",
        onChange: () => {},
        keyName: "",
        fn: {},
        required: true,
        schema: Immutable.fromJS({
          type: "string",
          enum: ["one", "two"]
        })
      }

      let wrapper = render(<JsonSchemaComponents.JsonSchemaForm {...props}/>)

      expect(wrapper.getByRole("combobox")).toBeInTheDocument()
      expect(wrapper.getAllByRole("option").length).toEqual(2)
      expect(wrapper.getByRole("option", { name: "one" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "two" })).toBeInTheDocument()
    })
  })
  describe("booleans", function() {
    it("should render the correct options for a boolean parameter", function(){

      let props = {
        getComponent: getComponentStub,
        value: "",
        onChange: () => {},
        keyName: "",
        fn: {},
        schema: Immutable.fromJS({
          type: "boolean"
        })
      }

      let wrapper = render(<JsonSchemaComponents.JsonSchemaForm {...props}/>)

      expect(wrapper.getByRole("combobox")).toBeInTheDocument()
      expect(wrapper.getAllByRole("option").length).toEqual(3)
      expect(wrapper.getByRole("option", { name: "--" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "true" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "false" })).toBeInTheDocument()
    })


    it("should render the correct options for an enum boolean parameter", function(){

      let props = {
        getComponent: getComponentStub,
        value: "",
        onChange: () => {},
        keyName: "",
        fn: {},
        schema: Immutable.fromJS({
          type: "boolean",
          enum: ["true"]
        })
      }

      let wrapper = render(<JsonSchemaComponents.JsonSchemaForm {...props}/>)

      expect(wrapper.getByRole("combobox")).toBeInTheDocument()
      expect(wrapper.getAllByRole("option").length).toEqual(2)
      expect(wrapper.getByRole("option", { name: "--" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "true" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "--" }).selected).toBe(true)
    })

    it("should render the correct options for a required boolean parameter", function(){

      let props = {
        getComponent: getComponentStub,
        value: "",
        onChange: () => {},
        keyName: "",
        fn: {},
        schema: Immutable.fromJS({
          type: "boolean",
          required: true
        })
      }

      let wrapper = render(<JsonSchemaComponents.JsonSchemaForm {...props}/>)

      expect(wrapper.getByRole("combobox")).toBeInTheDocument()
      expect(wrapper.getAllByRole("option").length).toEqual(3)
      expect(wrapper.getByRole("option", { name: "--" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "true" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "false" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "--" }).selected).toBe(true)
    })

    it("should render the correct options for a required enum boolean parameter", function(){

      let props = {
        getComponent: getComponentStub,
        value: "",
        onChange: () => {},
        keyName: "",
        fn: {},
        required: true,
        schema: Immutable.fromJS({
          type: "boolean",
          enum: ["true"]
        })
      }

      let wrapper = render(<JsonSchemaComponents.JsonSchemaForm {...props}/>)

      expect(wrapper.getByRole("combobox")).toBeInTheDocument()
      expect(wrapper.getAllByRole("option").length).toEqual(1)
      expect(wrapper.getByRole("option", { name: "true" })).toBeInTheDocument()
      expect(wrapper.getByRole("option", { name: "true" }).selected).toBe(true)
    })
  })
  describe("objects", function() {
    it("should render the correct editor for an OAS3 object parameter", function(){
      let updateQueue = []

      let props = {
        getComponent: getComponentStub,
        value: `{\n  "id": "abc123"\n}`,
        onChange: (value) => {
          updateQueue.push({ value })
        },
        keyName: "",
        fn: {},
        errors: List(),
        schema: Immutable.fromJS({
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "abc123"
            }
          }
        })
      }

      let wrapper = render(<JsonSchemaComponents.JsonSchemaForm {...props}/>)

      updateQueue.forEach(newProps => wrapper.rerender(<JsonSchemaComponents.JsonSchemaForm {...props} {...newProps}/>))

      expect(wrapper.getByRole("textbox")).toBeInTheDocument()
      expect(wrapper.getByRole("textbox").value).toEqual(`{\n  "id": "abc123"\n}`)
    })
  })
  describe.only("unknown types", function() {
    it("should render unknown types as strings", function(){

      let props = {
        getComponent: getComponentStub,
        value: "yo",
        onChange: () => {},
        keyName: "",
        fn: {},
        schema: Immutable.fromJS({
          type: "NotARealType"
        })
      }


      let wrapper = render(<JsonSchemaComponents.JsonSchemaForm {...props}/>)

      expect(wrapper.getByRole("textbox")).toBeInTheDocument()
      expect(wrapper.getByRole("textbox").value).toEqual("yo")
      // expect(wrapper.find("select input").length).toEqual(1)
      // expect(wrapper.find("select option").first().text()).toEqual("true")
    })

    it("should render unknown types as strings when a format is passed", function(){

      let props = {
        getComponent: getComponentStub,
        value: "yo",
        onChange: () => {},
        keyName: "",
        fn: {},
        schema: Immutable.fromJS({
          type: "NotARealType",
          format: "NotARealFormat"
        })
      }


      let wrapper = render(<JsonSchemaComponents.JsonSchemaForm {...props}/>)

      expect(wrapper.getByRole("textbox")).toBeInTheDocument()
      expect(wrapper.getByRole("textbox").value).toEqual("yo")
      // expect(wrapper.find("select input").length).toEqual(1)
      // expect(wrapper.find("select option").first().text()).toEqual("true")
    })
  })
})
