import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '../../components/ui/button'
import {Form, FormControl, FormField, FormItem} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { signupValidation } from "../../lib/validation"
import Loader from "../../components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "../../hooks/use-toast"
import { useCreateUserAccount, useSignInAccount } from "../../lib/react-query/queriesAndMutations"
import { useUserContext } from "../../context/AuthContext"


function SignupForm() {
  const {toast} = useToast()
  const navigate = useNavigate()
  const {checkAuthUser} = useUserContext()

   // 1. Define your form.
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name:"",
      username: "",
      email:"",
      password:""
    },
  })

  //Queries
  const {mutateAsync: createUserAccount, isPending: isCreatingUser} = useCreateUserAccount()
  const {mutateAsync: SignInAccount} = useSignInAccount()

  // 2. Define a submit handler.
  async function onSubmit(user: z.infer<typeof signupValidation>) {
    try {
      //create new user
      const newUser = await createUserAccount(user)
      
      if(!newUser) {
        toast({title: 'Sign up Error'})
        return
      }

      const session = await SignInAccount({
        email: user.email,
        password: user.password
      })

      if(!session) {
        toast({title:'Session failed.'})
        navigate("/sign-in")
        return
      }

      const isLoggedIn = await checkAuthUser()

      if(isLoggedIn) {
        form.reset()
        navigate('/')
      }
      else {
        toast({title: 'sign in failed'})
        return
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form {...form}>
      <div className="sm-420 flex-center flex-col">
        <img src="assets/images/logo.png" alt='logo' width='200'/>
        <h2 className="h3-bold md:h2-bold pt-2 sm:pt-2">Create a new account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>To use AlumniConnect enter your details</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4" >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="full name" type ="text" className="shad-input" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="username" type ="text" className="shad-input" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="college mail Id" type ="email" className="shad-input" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="password" type ="password" className="shad-input" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">{
          isCreatingUser ? (
            <div className = 'flex-center gap-2'>
              <Loader/> Loading...
            </div>
          ) : (
            "Sign up"
          )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account? 
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
      </form>
      </div>
    </Form>
  )
}

export default SignupForm
