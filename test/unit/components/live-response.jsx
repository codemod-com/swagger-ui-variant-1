import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"  
import { fromJSOrdered } from "core/utils"
import Curl from "core/components/curl"
import ResponseBody from "core/components/response-body"
import LiveResponse from "core/components/live-response"

describe("<LiveResponse/>", function(){
  let request = fromJSOrdered({
    credentials: "same-origin",
    headers: {
      accept: "application/xml"
    },
    url: "http://petstore.swagger.io/v2/pet/1"
  })

  let mutatedRequest = fromJSOrdered({
    credentials: "same-origin",
    headers: {
      accept: "application/xml",
      mutated: "header"
    },
    url: "http://mutated.petstore.swagger.io/v2/pet/1"
  })

  let requests = {
    request: request,
    mutatedRequest: mutatedRequest
  }

  const tests = [
    { showMutatedRequest: true, expected: { request: "mutatedRequest", requestForCalls: 0, mutatedRequestForCalls: 1 } },
    { showMutatedRequest: false, expected: { request: "request", requestForCalls: 1, mutatedRequestForCalls: 0 } }
  ]

  tests.forEach(function(test) {
    it("passes " + test.expected.request + " to Curl when showMutatedRequest = " + test.showMutatedRequest, function() {
// Given
      let response = fromJSOrdered({
        status: 200,
        url: "http://petstore.swagger.io/v2/pet/1",
        headers: {
          "content-type": "application/xml"
        },
        text: "<response/>",
        duration: 50
      })

      let mutatedRequestForSpy = jest.fn().mockImplementation(function() { return mutatedRequest })
      let requestForSpy = jest.fn().mockImplementation(function() { return request })

      let components = {
        curl: () => <div>Mocked Curl</div>,
        responseBody: () => <div>Mocked ResponseBody</div>
      }

      let props = {
        response: response,
        specSelectors: {
          mutatedRequestFor: mutatedRequestForSpy,
          requestFor: requestForSpy,
        },
        pathMethod: [ "/one", "get" ],
        getComponent: (c) => {
          return components[c]
        },
        displayRequestDuration: true,
        getConfigs: () => ({ showMutatedRequest: test.showMutatedRequest })
      }
       // When
      render(<LiveResponse {...props}/>)

       // Then
      expect(mutatedRequestForSpy).toHaveBeenCalledTimes(test.expected.mutatedRequestForCalls)
      expect(requestForSpy).toHaveBeenCalledTimes(test.expected.requestForCalls)

           const expectedUrl = requests[test.expected.request].get("url")
      expect(screen.getByText(expectedUrl)).toBeInTheDocument()

      
      expect(screen.getByText(/50 ms/)).toBeInTheDocument()
      const headersElement = screen.getByText(/content-type/i)
      expect(headersElement).toBeInTheDocument()
      expect(headersElement.textContent).toContain("application/xml")
    })
  })
})