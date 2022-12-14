import Server from '../../../Components/apis/Server';
import {describe, expect, test} from '@jest/globals';

var createdUserIds = new Array

describe('Creating User ', () => {
    it('creating first user by trying to authenticate with new username', async() => {
        var result = await Server.authenticate({'username': 'myuser1', 'password': 'mypassword1'})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        createdUserIds.push(result[0].id)
        expect (result[0]).toHaveProperty('account_name')
        expect (result[0]).toHaveProperty('id')
    })
    it('creating second user by trying to authenticate with new username', async() => {
        var result = await Server.authenticate({'username': 'myuser2', 'password': 'mypassword2'})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        createdUserIds.push(result[0].id)
        expect (result[0]).toHaveProperty('account_name')
        expect (result[0]).toHaveProperty('id')
    })
    it('creating third user by trying to authenticate with new username', async() => {
        var result = await Server.authenticate({'username': 'myuser3', 'password': 'mypassword3'})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        createdUserIds.push(result[0].id)
        expect (result[0]).toHaveProperty('account_name')
        expect (result[0]).toHaveProperty('id')
    })
})

describe('Authentication ', () => {
    it('authenticates given user with incorrect password', async() => {
        var result = await Server.authenticate({'username': 'admin', 'password': 'abcde12345'})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result).toBeUndefined
    })
    it('authenticates given user with correct data', async() => {
        var result = await Server.authenticate({'username': 'admin', 'password': 'admin123'})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result[0]).toHaveProperty('account_name')
        expect (result[0]).toHaveProperty('id')
    })
})

describe('Finding User ', () => {
    it('finding user by correct name', async() => {
        var result = await Server.getUsers({'name': 'student', 'page': 1, 'page_size': 1})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result[0][0]).toHaveProperty('account_name')
        expect (result[0][0]).toHaveProperty('id')
    })
    it('finding user by incorrect name', async() => {
        var result = await Server.getUsers({'id': 1})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result[0][0]).toHaveProperty('account_name')
        expect (result[0][0]).toHaveProperty('id')
    })
})

describe('Deleting user ', () => {
    it('deletes given user with correct data', async() => {
        var result = await Server.deleteUser({'id': createdUserIds[2]})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        var isResultArray = Array.isArray(result);
        var hasCorrectKeys = false;
        if (isResultArray){
            hasCorrectKeys = result[0].hasOwnProperty('id') && result[0].hasOwnProperty('account_name');
        }
        expect (hasCorrectKeys).toBe(true);
    })
    it('deletes given users with correct data', async() => {
        var result = await Server.deleteUser({'id': (createdUserIds[0],createdUserIds[1])})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        var isResultArray = Array.isArray(result);
        var hasCorrectKeys = false;
        if (isResultArray){
            hasCorrectKeys = result[0].hasOwnProperty('id') && result[0].hasOwnProperty('account_name');
        }
        expect (hasCorrectKeys).toBe(true);
    })
})

describe('Finding Permissions ', () => {
    it('getting permissions of user with correct id', async() => {
        var result = await Server.getUserPermissionsById({'id': 3})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result).toHaveProperty('account_id')
        expect (result).toHaveProperty('can_manage_permissions')
        expect (result).toHaveProperty('can_manage_tests')
        expect (result).toHaveProperty('can_access_admin_panel')
        expect (result).toHaveProperty('can_view_stats')
    })
    it('getting permissions of user with incorrect id', async() => {
        var result = await Server.getUserPermissionsById({'id': 123})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result).toBeUndefined
    })
})

describe('Finding Groups ', () => {
    it('getting groups of user with correct id', async() => {
        var result = await Server.getUserGroupsById({'userId': 1})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result[0]).toHaveProperty('account_id')
        expect (result[0]).toHaveProperty('group_name')
        expect (result[0]).toHaveProperty('can_manage_permissions')
        expect (result[0]).toHaveProperty('can_manage_tests')
        expect (result[0]).toHaveProperty('can_access_admin_panel')
        expect (result[0]).toHaveProperty('can_view_stats')
    })
    it('getting groups of user with incorrect id', async() => {
        var result = await Server.getUserGroupsById({'userId': 123})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result).toBeUndefined
    })
})