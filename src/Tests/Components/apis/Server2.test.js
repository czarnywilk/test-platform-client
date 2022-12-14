import Server from '../../../Components/apis/Server';
import {describe, expect, test} from '@jest/globals';

var createdQuestionId

describe('Authentication ', () => {
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

describe('Editing Groups ', () => {
    jest.setTimeout(60000)
    it('editing groups by adding new group', async() => {
        const newGroups = [
            {
                'id': 1,
                'group_name': 'student',
                'can_manage_permissions': true,
                'can_manage_tests': false,
                'can_access_admin_panel': false,
                'can_view_stats': false
            },
            {
                'id': 2,
                'group_name': 'student',
                'can_manage_permissions': false,
                'can_manage_tests': false,
                'can_access_admin_panel': false,
                'can_view_stats': true
            },
            {
                'id': 3,
                'group_name': 'admin',
                'can_manage_permissions': true,
                'can_manage_tests': true,
                'can_access_admin_panel': true,
                'can_view_stats': true
            }
        ]
        var result = await Server.editPermissions(newGroups)
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        //result = JSON.stringify(result)
        expect (result).toStrictEqual(newGroups)
    })
    
})

describe('Getting All Tests ', () => {
    it('getting all tests from database', async() => {
        var result = await Server.getAllTests({'page': 1, 'page_size': 3})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result[0][0]).toHaveProperty('id')
        expect (result[0][0]).toHaveProperty('test_name')
        expect (result[0][0]).toHaveProperty('start_time')
        expect (result[0][0]).toHaveProperty('end_time')
        expect (result[0][0]).toHaveProperty('count')
        expect (result[0][0]).toHaveProperty('groups')
    })
})

describe('Getting Tests By Ids ', () => {
    it('getting test without questions by id', async() => {
        var result = await Server.getTestById({'id': 1}, false)
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result).toHaveProperty('id')
        expect (result).toHaveProperty('test_name')
        expect (result).toHaveProperty('start_time')
        expect (result).toHaveProperty('end_time')
        expect (result).toHaveProperty('groups')
    })
    it('getting test with questions by id', async() => {
        var result = await Server.getTestById({'id': 1}, true)
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result).toHaveProperty('id')
        expect (result).toHaveProperty('test_name')
        expect (result).toHaveProperty('start_time')
        expect (result).toHaveProperty('end_time')
        expect (result).toHaveProperty('groups')
        expect (result).toHaveProperty('questions')
        result.questions.forEach(element => {
            expect (element).toHaveProperty('test_id')
            expect (element).toHaveProperty('correct_answer_idx')
            expect (element).toHaveProperty('question')
            expect (element).toHaveProperty('id')
            expect (element).toHaveProperty('answers')
        });
    })
})

describe('Adding Test ', () => {
    it('adding test with few questions to database', async() => {
        const test = {
            'test_name': 'MyTestingTest',
            'groups': [1, 2, 3],
            'start_time': '2022-12-10t15:00',
            'end_time': '2022-12-31t23:59',
            'questions': [
                {
                    'question': 'Is that a test?',
                    'answers': ['yes', 'no'],
                    'correct_answer_idx': [0]
                },
                {
                    'question': 'What grade should I get?',
                    'answers': ['5.0', 'A+', 'BDB', 'The Highest Possible'],
                    'correct_answer_idx': [0, 1, 2, 3]
                }
            ]
        }
        var result = await Server.sendTest(test)
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        createdQuestionId = result[0].id
        expect (result[0]).toHaveProperty('id')
        expect (result[0]).toHaveProperty('test_name')
        expect (result[0]).toHaveProperty('start_time')
        expect (result[0]).toHaveProperty('end_time')
        expect (result[0]).toHaveProperty('groups')
        expect (result[0]).toHaveProperty('questions')
        result[0].questions.forEach(element => {
            expect (element).toHaveProperty('test_id')
            expect (element).toHaveProperty('correct_answer_idx')
            expect (element).toHaveProperty('question')
            expect (element).toHaveProperty('id')
            expect (element).toHaveProperty('answers')
        });
    })

})

describe('Deleting Test ', () => {
    it('deleting test with questions from database', async() => {
        var result = await Server.deleteTest({'id': createdQuestionId})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result[0]).toHaveProperty('id')
        expect (result[0]).toHaveProperty('test_name')
        expect (result[0]).toHaveProperty('start_time')
        expect (result[0]).toHaveProperty('end_time')
        expect (result[0]).toHaveProperty('groups')
        
    })
})

describe('Finding Question ', () => {
    it('finding question by correct id', async() => {
        var result = await Server.getQuestions({'id': 1})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result[0]).toHaveProperty('id')
        expect (result[0]).toHaveProperty('test_id')
        expect (result[0]).toHaveProperty('question')
        expect (result[0]).toHaveProperty('answers')
        expect (result[0]).toHaveProperty('correct_answer_idx')
    })
})

describe('Finding Answers ', () => {
    it('finding answers by correct questionId, userId and testId', async() => {
        var result = await Server.getAnswers({'questionId': 8, 'userId': 3, 'testId': 4})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        result.forEach(element => {
            expect (element).toHaveProperty('id')
            expect (element).toHaveProperty('test_id')
            expect (element).toHaveProperty('question_id')
            expect (element).toHaveProperty('user_id')
            expect (element).toHaveProperty('given_answer_idx')
        })
    })
    it('finding answers by correct userId and testId', async() => {
        var result = await Server.getAnswers({'userId': 1, 'testId': 1})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        result.forEach(element => {
            expect (element).toHaveProperty('id')
            expect (element).toHaveProperty('test_id')
            expect (element).toHaveProperty('question_id')
            expect (element).toHaveProperty('user_id')
            expect (element).toHaveProperty('given_answer_idx')
        })
    })
    it('finding answers by correct id', async() => {
        var result = await Server.getAnswers({'id': 1})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        result.forEach(element => {
            expect (element).toHaveProperty('id')
            expect (element).toHaveProperty('test_id')
            expect (element).toHaveProperty('question_id')
            expect (element).toHaveProperty('user_id')
            expect (element).toHaveProperty('given_answer_idx')
        })
    })
})

describe('Sending Answer ', () => {
    var answers = [{
        'question_id': 3,
        'given_answer_idx': [0, 1, 2],
        'user_id': 3,
        'test_id': 1
    }]
    it('sending answer', async() => {
        var result = await Server.sendAnswers(answers)
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        expect (result[0]).toHaveProperty('id')
        expect (result[0]).toHaveProperty('test_name')
        expect (result[0]).toHaveProperty('date')
        expect (result[0]).toHaveProperty('test_id')
        expect (result[0]).toHaveProperty('user_name')
        expect (result[0]).toHaveProperty('user_id')
        expect (result[0]).toHaveProperty('max_points')
        expect (result[0]).toHaveProperty('points')
    })
})

describe('Getting Result ', () => {
    it('getting result by correct id', async() => {
        var result = await Server.getResults({'id': 1})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        result.forEach(element => {
            expect (element).toHaveProperty('id')
            expect (element).toHaveProperty('test_name')
            expect (element).toHaveProperty('date')
            expect (element).toHaveProperty('test_id')
            expect (element).toHaveProperty('user_name')
            expect (element).toHaveProperty('user_id')
            expect (element).toHaveProperty('max_points')
            expect (element).toHaveProperty('points')
        })
    })
    it('getting result by correct userId', async() => {
        var result = await Server.getResults({'userName': 'student'})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        result.forEach(element => {
            expect (element).toHaveProperty('id')
            expect (element).toHaveProperty('test_name')
            expect (element).toHaveProperty('date')
            expect (element).toHaveProperty('test_id')
            expect (element).toHaveProperty('user_name')
            expect (element).toHaveProperty('user_id')
            expect (element).toHaveProperty('max_points')
            expect (element).toHaveProperty('points')
        })
    })
    it('getting result by correct testId', async() => {
        var result = await Server.getResults({'testName': 'test_1'})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        result.forEach(element => {
            expect (element).toHaveProperty('id')
            expect (element).toHaveProperty('test_name')
            expect (element).toHaveProperty('date')
            expect (element).toHaveProperty('test_id')
            expect (element).toHaveProperty('user_name')
            expect (element).toHaveProperty('user_id')
            expect (element).toHaveProperty('max_points')
            expect (element).toHaveProperty('points')
        })
    })
    it('getting result by correct testId and userId', async() => {
        var result = await Server.getResults({'userName': 'student', 'testName': 'test_1'})
            .then((response) => {
                return response;
            }).catch((error) => {
            
            })
        result.forEach(element => {
            expect (element).toHaveProperty('id')
            expect (element).toHaveProperty('test_name')
            expect (element).toHaveProperty('date')
            expect (element).toHaveProperty('test_id')
            expect (element).toHaveProperty('user_name')
            expect (element).toHaveProperty('user_id')
            expect (element).toHaveProperty('max_points')
            expect (element).toHaveProperty('points')
        })
    })
})

