import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import api from './api/axiosConfig';
import { useAuth } from './firebase';
import { getUserName } from './firebase';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const userLoggedIn = useAuth();
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState(null)
    const [cartItems, setCartItems] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const setTotalAmount = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price * item.qty;
        });
        setTotalPrice(totalPrice);
    };
    const setTotalQty = () => {
        let totalQuantity = 0;
        cartItems.forEach((item) => {
            totalQuantity += item.qty;
        });
        setTotalQuantity(totalQuantity);
    };



    const getCartItemId = async (productId, userId) => {
        try {
            const response = await api.get(`/api/ShoppingCart/${productId}/${userId}/GetCartItemId`)
            return response.data;
        }catch (err) {  
            console.log(err);
        }
    }
    const getUserId = async (userName) => {
        try {
            const response = await api.get(`/api/addUser/${userName}/GetId`).then((res) => {
                setUserId(res.data);
            });

        }
        catch (err) {
            console.log(err);

        }
    }
    const updateCart = async (cartItemId, qty) => {
        const url = `/api/ShoppingCart/${cartItemId}`;
        try {
            const response = await api.patch(url, {
                cartItemId: cartItemId,
                qty: qty
            });
            console.log(response.data);
        } catch (error) {
            console.log('BAD RESPONCE:', error);
        }
    }
    const removeFromCart = async (productId) => {
        console.log(productId)
     const url = `/api/ShoppingCart/${productId}`;
        try {
            const response = await api.delete(url);
            console.log(response.data);
        }catch
        (err) {
            console.log(err);
        }
    };
    const addToCart = async (productId,qty) => {
        const url = `/api/ShoppingCart`;

        try {
            const response = await api.post(url, {

                cartId: userId,
                productId: productId,
                qty: qty

            }
            )
            console.log(response.data);


        } catch (error) {
            console.log('BAD RESPONCE:', error);
        }
    }
    const getCartItems = async (userId) => {
        try {
            const response = await api.get(`/api/ShoppingCart/${userId}/GetItems`);
            setCartItems(response.data);
        }
        catch (err) {
            console.log(err);
        }
    };
    const setCartItemsToEmpty = () => {
        setCartItems([]);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                //const email = JSON.stringify();// Replace with the desired email
                const email = `${userLoggedIn?.email}`
                const fetchedUserName = await getUserName(email);
                setUserName(fetchedUserName);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [userLoggedIn?.email])


    useEffect(() => {
        getUserId(userName)
    }, [userName]);

    useEffect(() => {
        getCartItems(userId);
    }, [userId])

    useEffect(() => {
        setTotalQty();
        setTotalAmount();
    }, [totalQuantity]);

    const setToLogged = () => {
        setIsLogged(true);
    }
    const setToLoggedOut = () => {
        setIsLogged(false);
    }


    return (
        <AuthContext.Provider value={{
            isLogged,
            setToLogged,
            setToLoggedOut,
            cartItems,
            getCartItems,
            userLoggedIn,
            userName,
            userId,
            setCartItemsToEmpty,
            totalPrice,
            totalQuantity,
            setTotalAmount,
            setTotalQty,
            addToCart,
            removeFromCart,
            getCartItemId,
            updateCart,
            setUserId
        }}>
            {children}
        </AuthContext.Provider>
    );
}