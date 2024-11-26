import React from "react"
import { render } from "@testing-library/react"
import VersionPragmaFilter from "core/plugins/oas31/components/version-pragma-filter"

describe("<VersionPragmaFilter/>", function(){
  it("renders children for a Swagger 2 definition", function(){
    // When
    const { getByText } = render(
      <VersionPragmaFilter isSwagger2={true} isOAS3={false} isOAS31={false}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(getByText("hello!")).toBeInTheDocument()
  })

  it("renders children for an OpenAPI 3.0.x definition", function(){
    // When
    const { getByText } = render(
      <VersionPragmaFilter isSwagger2={false} isOAS3={true} isOAS31={false}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(getByText("hello!")).toBeInTheDocument()
  })

  it("renders children for an OpenAPI 3.1.0 definition", function(){
    // When
    const { getByText } = render(
      <VersionPragmaFilter isSwagger2={false} isOAS3={false} isOAS31={true}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(getByText("hello!")).toBeInTheDocument()
  })

  it("renders children when a bypass prop is set", function(){
    // When
    const { getByText } = render(
      <VersionPragmaFilter bypass isSwagger2={false} isOAS3={false} isOAS31={false}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(getByText("hello!")).toBeInTheDocument()
  })

  it("renders the correct message for an ambiguous-version definition", function(){
    // When
    const { container } = render(
      <VersionPragmaFilter isSwagger2={true} isOAS3={true} isOAS31={true}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(container.querySelector("div.version-pragma__message--ambiguous")).toBeInTheDocument()
    expect(container.querySelector("div.version-pragma__message--missing")).not.toBeInTheDocument()
  })

  it("renders the correct message for a missing-version definition", function(){
    // When
    const { container } = render(
      <VersionPragmaFilter isSwagger2={false} isOAS3={false} isOAS31={false}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(container.querySelector("div.version-pragma__message--missing")).toBeInTheDocument()
    expect(container.querySelector("div.version-pragma__message--ambiguous")).not.toBeInTheDocument()
  })
})
