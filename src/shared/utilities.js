import client from "axios";
import { ROOT_URL } from './constants/apis';


export const axios = client.create({
  baseURL: ROOT_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCSRFToken(),
  },
});

export function createAuthorizedRequest(method, path, params) {
  const token = localStorage.getItem('id_token') || null;
  const config = { headers: { 'Authorization': `Bearer ${token}` } };
  switch(method) {
    case 'get':
      return axios.get(path, config);
    case 'post':
      return axios.post(path, params, config);
    case 'patch' :
      return axios.patch(path, params, config);
    case 'delete' :
      return axios.delete(path, config);
  }
}

export function trimPost(params) {
  return {
    ...convertKeyNameInSnakeCase(params),
    items_attributes:
      params.itemsAttributes
        .filter(item => !item.editing)
        .map(item => convertKeyNameInSnakeCase(item))
  };
}

export function trimProject(params) {
  return { ...convertKeyNameInSnakeCase(params) };
}

export function trimAuthor(params) {
  return {
    ...convertKeyNameInSnakeCase(params),
    social_accounts_attributes:
      params.socialAccountsAttributes
        .filter(item => item.url)
        .map(item => convertKeyNameInSnakeCase(item))
  };
}

function convertKeyNameInSnakeCase(object) {
  return Object.keys(object).reduce((newObject, oldKey) => {
    newObject[convertCamelCaseToSnakeCase(oldKey)] = object[oldKey];
    return newObject;
  }, {});
}

function convertCamelCaseToSnakeCase(string) {
  return string.replace(/([A-Z])/g,
    function(string) {
      return '_' + string.charAt(0).toLowerCase();
    }
  );
}

export function getCSRFToken() {
  const el = document.querySelector('meta[name="csrf-token"]');
  return el ? el.getAttribute('content') : '';
}

export function capitalize(string) {
  return (string.substring(0, 1).toUpperCase() + string.substring(1));
}
