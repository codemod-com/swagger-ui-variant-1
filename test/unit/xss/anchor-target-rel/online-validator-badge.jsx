import React from "react"
import { render } from "@testing-library/react"
import OnlineValidatorBadge from "core/components/online-validator-badge"

describe("<OnlineValidatorBadge/> Anchor Target Safety", function () {
  it("should render a validator link with safe `rel` attributes", function () {
    // When
    const props = {
      getConfigs: () => ({}),
      getComponent: () => null,
      specSelectors: {
        url: () => "https://smartbear.com/swagger.json"
      }
    }
    const { getByRole } = render(
     <OnlineValidatorBadge {...props} />
    )

    const anchor = getByRole("link")

    // Then
    expect(anchor).toHaveAttribute(
      "href",
      "https://validator.swagger.io/validator/debug?url=https%3A%2F%2Fsmartbear.com%2Fswagger.json"
    )
    expect(anchor).toHaveAttribute("target", "_blank")
    expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
    expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
  })
})
