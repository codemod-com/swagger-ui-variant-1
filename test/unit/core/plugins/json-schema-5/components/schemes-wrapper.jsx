import React from "react"
import { render } from "@testing-library/react"
import { fromJS } from "immutable"
import SchemesContainer from "core/plugins/json-schema-5/containers/schemes"
import Schemes from "core/plugins/json-schema-5/components/schemes"
import { Col } from "core/components/layout-utils"
import { jest } from "@jest/globals"

jest.mock("core/plugins/json-schema-5/components/schemes", () => () => <div data-testid="schemes"></div>)

describe("<SchemesContainer/>", function(){

  const components = {
    schemes: Schemes,
    Col,
    authorizeBtn: () => <span className="mocked-button" id="mocked-button" />
  }
  const mockedProps = {
    specSelectors: {
      securityDefinitions() {},
      operationScheme() {},
      schemes() {}
    },
    specActions: {
      setScheme() {}
    },
    getComponent: c => components[c]
  }

  it("renders Schemes inside SchemesContainer if schemes are provided", function(){

    // Given
    let props = {...mockedProps}
    props.specSelectors = {...mockedProps.specSelectors}
    props.specSelectors.operationScheme = function() {return "http"}
    props.specSelectors.schemes = function() {return fromJS(["http", "https"])}

    // When
    const { queryByTestId } = render(<SchemesContainer {...props}/>)

    // Then
    expect(queryByTestId("schemes")).toBeInTheDocument()
  })

  it("does not render Schemes inside SchemeWrapper if empty array of schemes is provided", function(){

    // Given
    let props = {...mockedProps}
    props.specSelectors = {...mockedProps.specSelectors}
    props.specSelectors.schemes = function() {return fromJS([])}

    // When
    const { queryByTestId } = render(<SchemesContainer {...props}/>)

    // Then
    expect(queryByTestId("schemes")).not.toBeInTheDocument()
  })

  it("does not render Schemes inside SchemeWrapper if provided schemes are undefined", function(){

    // Given
    let props = {...mockedProps}
    props.specSelectors = {...mockedProps.specSelectors}
    props.specSelectors.schemes = function() {return undefined}

    // When
    const { queryByTestId } = render(<SchemesContainer {...props}/>)

    // Then
    expect(queryByTestId("schemes")).not.toBeInTheDocument()
  })
})
