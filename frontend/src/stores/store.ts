import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import brand_stylesSlice from './brand_styles/brand_stylesSlice';
import categoriesSlice from './categories/categoriesSlice';
import category_questionsSlice from './category_questions/category_questionsSlice';
import color_codesSlice from './color_codes/color_codesSlice';
import customersSlice from './customers/customersSlice';
import industriesSlice from './industries/industriesSlice';
import ordersSlice from './orders/ordersSlice';
import packagesSlice from './packages/packagesSlice';
import paymentsSlice from './payments/paymentsSlice';
import productsSlice from './products/productsSlice';
import ticketsSlice from './tickets/ticketsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    brand_styles: brand_stylesSlice,
    categories: categoriesSlice,
    category_questions: category_questionsSlice,
    color_codes: color_codesSlice,
    customers: customersSlice,
    industries: industriesSlice,
    orders: ordersSlice,
    packages: packagesSlice,
    payments: paymentsSlice,
    products: productsSlice,
    tickets: ticketsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
