/**
 * @prettier
 */
import React from "react"
import { render } from "@testing-library/react"
import { fromJS, List } from "immutable"

import Response from "core/components/response"
import ModelExample from "core/plugins/json-schema-5/components/model-example"
import {
  inferSchema,
  memoizedSampleFromSchema,
  memoizedCreateXMLExample,
} from "core/plugins/json-schema-5-samples/fn/index"
import makeGetSampleSchema from "core/plugins/json-schema-5-samples/fn/get-sample-schema"
import makeGetJsonSampleSchema from "core/plugins/json-schema-5-samples/fn/get-json-sample-schema"
import makeGetYamlSampleSchema from "core/plugins/json-schema-5-samples/fn/get-yaml-sample-schema"
import makeGetXmlSampleSchema from "core/plugins/json-schema-5-samples/fn/get-xml-sample-schema"

jest.mock("core/plugins/json-schema-5/components/model-example", () => jest.fn(() => null))

const MockModelExample = jest.requireMock("core/plugins/json-schema-5/components/model-example")

describe("<Response />", function () {
  const dummyComponent = () => null
  const components = {
    headers: dummyComponent,
    highlightCode: dummyComponent,
    modelExample: ModelExample,
    Markdown: dummyComponent,
    operationLink: dummyComponent,
    contentType: dummyComponent,
    ResponseExtension: dummyComponent,
    Headers: dummyComponent,
    HighlightCode: dummyComponent,
    ModelExample: dummyComponent,
    OperationLink: dummyComponent,
    ContentType: dummyComponent,
    ExamplesSelect: dummyComponent,
    Example: dummyComponent,
  }
  const getSystem = () => ({
    getComponent: (c) => components[c],
    getConfigs: () => {
      return {}
    },
    specSelectors: {
      isOAS3() {
        return false
      },
    },
    fn: {
      inferSchema,
      memoizedSampleFromSchema,
      memoizedCreateXMLExample,
      getJsonSampleSchema: makeGetJsonSampleSchema(getSystem),
      getYamlSampleSchema: makeGetYamlSampleSchema(getSystem),
      getXmlSampleSchema: makeGetXmlSampleSchema(getSystem),
      getSampleSchema: makeGetSampleSchema(getSystem),
    },
  })
  const props = {
    ...getSystem(),
    contentType: "application/json",
    className: "for-test",
    specPath: List(),
    response: fromJS({
      schema: {
        type: "object",
        properties: {
          // Note reverse order: c, b, a
          c: {
            type: "integer",
          },
          b: {
            type: "boolean",
          },
          a: {
            type: "string",
          },
        },
      },
    }),
    code: "200",
  }

  it("renders the model-example schema properties in order", function () {
    MockModelExample.mockImplementation(
      ({ schema }) => <div data-testid="model-example" data-schema-props={Object.keys(schema.toJS().properties).join(",")} />
    )

    const wrapper = render(<Response {...props} />)
    const renderedModelExample = wrapper.queryAllByTestId("model-example")
    expect(renderedModelExample.length).toEqual(1)

    // Assert the schema's properties have maintained their order
    expect(renderedModelExample[0].getAttribute("data-schema-props")).toEqual("c,b,a")
  })
})
