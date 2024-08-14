import { gql } from '@apollo/client'

const PERSON_DETAILS = gql`
  fragment personDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...personDetails
    }
  }
  ${PERSON_DETAILS}
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      personDetails
    }
  }
  ${PERSON_DETAILS}
`

export const CREATE_PERSON = gql`
  mutation AddPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`

export const EDIT_PHONE = gql`
  mutation editNumberByName($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
