import React from "react"
import { render } from "@testing-library/react"
import { fromJS } from "immutable"
import ServersContainer from "core/plugins/oas3/components/servers-container"
import Servers from "core/plugins/oas3/components/servers"
import { Col } from "core/components/layout-utils"
import { jest } from "@jest/globals"

jest.mock("core/plugins/oas3/components/servers", () => () => <div data-testid="servers"></div>)

describe("<ServersContainer/>", function(){

  const components = {
    Servers,
    Col
  }
  const mockedProps = {
    specSelectors: {
      servers() {}
    },
    oas3Selectors: {
      selectedServer() {},
      serverVariableValue() {},
      serverEffectiveValue() {}
    },
    oas3Actions: {
      setSelectedServer() {},
      setServerVariableValue() {}
    },
    getComponent: c => components[c]
  }

  it("renders Servers inside ServersContainer if servers are provided", function(){

    // Given
    let props = {...mockedProps}
    props.specSelectors = {...mockedProps.specSelectors}
    props.specSelectors.servers = function() {return fromJS([{url: "http://server1.com"}])}
    props.oas3Selectors = {...mockedProps.oas3Selectors}
    props.oas3Selectors.selectedServer = function() {return "http://server1.com"}

    // When
    const { queryByTestId } = render(<ServersContainer {...props}/>)

    // Then
    expect(queryByTestId("servers")).toBeInTheDocument()
  })

  it("does not render Servers inside ServersContainer if servers are empty", function(){

    // Given
    let props = {...mockedProps}
    props.specSelectors = {...mockedProps.specSelectors}
    props.specSelectors.servers = function() {return fromJS([])}

    // When
    const { queryByTestId } = render(<ServersContainer {...props}/>)

    // Then
    expect(queryByTestId("servers")).not.toBeInTheDocument()
  })

  it("does not render Servers inside ServersContainer if servers are undefined", function(){

    // Given
    let props = {...mockedProps}

    // When
    const { queryByTestId } = render(<ServersContainer {...props}/>)

    // Then
    expect(queryByTestId("servers")).not.toBeInTheDocument()
  })
})
