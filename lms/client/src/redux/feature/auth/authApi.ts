import { apiSlice } from "../api/apiSlice";
import { userLoggineIn, userLoogedOut, userRegistration } from "./authSlice";


type RegistrationResponce = {
    message: string;
    activationToken: string;
}
type RegistrationData = {}


export const autApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation<RegistrationResponce, RegistrationData>({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
                credentials: "include" as const,

            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        activation: builder.mutation({
            query: ({ activationCode, activationToken }) => ({
                url: "activation",
                method: "POST",
                body: { activationCode, activationToken },
                credentials: "include" as const,

            })
        }),
        login:builder.mutation({
            query: ({ email, password }) => ({
                url: "login",
                method: "POST",
                body: { email, password },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;    
                    dispatch(
                        userLoggineIn({
                            accessToken: result.data.accessToken,
                            user:result.data.user
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            }
    
        
        }),
        socialAuth:builder.mutation({
            query: ({ email,name,avatar }) => ({
                url: "social-auth",
                method: "POST",
                body: { email,name,avatar  },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;    
                    dispatch(
                        userLoggineIn({
                            accessToken: result.data.accessToken,
                            user:result.data.user
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            }
    
        
        }),
        logOut:builder.query({
            query: () => ({
                url: "logout",
                method:"GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;    
                    dispatch(
                        userLoogedOut()
                    );
                } catch (error) {
                    console.log(error);
                }
            }
    
        
        })
    }),
})

export const { useRegistrationMutation, useActivationMutation ,useLoginMutation,useSocialAuthMutation,useLogOutQuery} = autApi;