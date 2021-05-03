import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $style: String!
    $color: String!
    $customText: String!
    $size: String!
    $quantity: Int!
    $price: Int!
    $category: String!
  ) {
    addProduct(
      style: $style
      color: $color
      customText: $customText
      size: $size
      quantity: $quantity
      price: $price
      category: $category
    ) {
      _id
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      _id
      purchaseDate
      products {
        _id
        price
      }
    }
  }
`;

export const ADD_DONATION = gql`
  mutation addDonation($goalHitDate: String!) {
    addDonation(goalHitDate: $goalHitDate) {
      _id
      goalHitDate
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
