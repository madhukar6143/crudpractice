import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

function UserList() {

    let { register, handleSubmit, setValue,formState:{errors}} = useForm()
    let [users, setUsers] = useState([])
    let [editUser, setEditUser] = useState({
        status: false,
        id: 0
    })


    //get users 
    useEffect(() => {
        getUsers()
    },
        []
    )


    //get users
    const getUsers = async () => {
        let response = await axios.get('user/get-users')
       await setUsers(response.data.payload)
    }

    //delete user
    const deleteUserById = async (id) => {

       let response= await axios.delete(`user/remove-user/${id}`)
       alert(response.data.message)
        getUsers()

    }

    //edit user
    const editUserById = (userObj) => {

        setEditUser({ ...editUser, status: true, id: userObj._id })
        setValue("username", userObj.username)
        setValue("password", userObj.password)
    }


    //save user
    const saveUserById = async (modifiedUser) => {
      let response=  await axios.put('user/update-user', modifiedUser)
        setEditUser({ ...editUser, status: false })
        alert(response.data.message)
        getUsers()

    }

    return (
        <div className='text-center mt-5 container'>
            <p className="display-3 fw-bold text-primary">List of Users</p>
            {/* empty list */}
            {users.length === 0 && <p className='text-danger'>No users found</p>}
            {users.length !== 0 &&
                <form onSubmit={handleSubmit(saveUserById)}>
                    <table className="table bg-light">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map((userObj) => <tr key={userObj._id}>
                                    <td>
                                        {editUser.status === true && editUser.id === userObj._id ?
                                        <>
                                            <input type="text"  {...register("username",{ 
                                                // check username is empty
                                               required: "username required.",
                                               //minimum lentgh of username
                                              minLength: 
                                              {
                                                value: 6,
                                                message: 'minimum length should be 6' // JS only: <p>error message</p> TS only support string
                                              }
                                               }
                                            )}  />
                                            {errors.username && <p>{errors.username.message}</p>}
                                            </>
                                             :
                                            <> {userObj.username}</>
                                        }


                                    </td>
                                    <td>
                                        {editUser.status === true && editUser.id === userObj._id ?
                                        <>
                                            <input type="text" 
                                            {...register("password",{ required: "password required,",

                                            //check pattern contain requitrements
                                          pattern: {
                                             value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                             message: 'Password must contain at least one capital letter, one number, and one special character' // JS only: <p>error message</p> TS only support string
                                           }})} />                                     
                                         {errors.password && <p>{errors.password.message}</p>}
                                         </>
                                             :
                                              <> {userObj.password}</>
                                        }
                                    </td>
                                    <td>
                                        {editUser.status === true && editUser.id === userObj._id ?


                                            <input type="submit" className="btn btn-success" value="Save" /> :
                                            <>
                                                <button type="button" className="btn btn-warning m-1" onClick={() => editUserById(userObj)}>Edit</button>
                                                <button type="button" className="btn btn-danger m-1" onClick={() => deleteUserById(userObj._id)}>x</button>
                                            </>
                                        }


                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </form>


            }

        </div>
    )
}

export default UserList