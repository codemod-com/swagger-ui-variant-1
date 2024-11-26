import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import OnlineValidatorBadge from "core/components/online-validator-badge"
import expect from "expect"

describe("<OnlineValidatorBadge/>", function () {
  it("should render a validator link and image correctly for the default validator", function () {
    // When
    const props = {
      getConfigs: () => ({}),
      getComponent: () => null,
      specSelectors: {
        url: () => "https://smartbear.com/swagger.json"
      }
    }

    render(
      <OnlineValidatorBadge {...props} />)
    
    const link = screen.getByRole("link", { name: /validator/i })
    expect(link).toHaveAttribute(
      "href", 
      "https://validator.swagger.io/validator/debug?url=https%3A%2F%2Fsmartbear.com%2Fswagger.json"
    )
  })

  it("should encode a definition URL correctly", () => {
    const props = {
      getConfigs: () => ({}),
      getComponent: () => null,
      specSelectors: {
        url: () => "http://google.com/swagger.json"
      }
    }
   render(
      <OnlineValidatorBadge {...props} />
    )

    // Then
    
    const link = screen.getByRole("link", { name: /validator/i })
    expect(link).toHaveAttribute(
      "href", 
      "https://validator.swagger.io/validator/debug?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )

   
    const validatorElement = screen.getByLabelText("validator")
    expect(validatorElement).toBeInTheDocument()
  })

  it("should resolve a definition URL against the browser's location", function () {
    // TODO: mock `window`
    // When

    const props = {
      getConfigs: () => ({}),
      getComponent: () => null,
      specSelectors: {
        url: () => "http://google.com/swagger.json"
      }
    }
   render(
      <OnlineValidatorBadge {...props} />
    )
    
    const link = screen.getByRole("link", { name: /validator/i })
    expect(link).toHaveAttribute(
      "href", 
      "https://validator.swagger.io/validator/debug?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )

  
    const validatorElement = screen.getByLabelText("validator")
    expect(validatorElement).toBeInTheDocument()
  })
   // should resolve a definition URL against the browser's location
})