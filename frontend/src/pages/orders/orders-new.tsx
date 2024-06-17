import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/orders/ordersSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  order_date: '',

  total_price: '',

  customer: '',

  industry: '',

  products: [],

  color_codes: [],

  brand_style: '',

  answers: '',

  status: 'pending',
};

const OrdersNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/orders/orders-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='OrderDate'>
                <Field
                  type='datetime-local'
                  name='order_date'
                  placeholder='OrderDate'
                />
              </FormField>

              <FormField label='TotalPrice'>
                <Field
                  type='number'
                  name='total_price'
                  placeholder='TotalPrice'
                />
              </FormField>

              <FormField label='Customer' labelFor='customer'>
                <Field
                  name='customer'
                  id='customer'
                  component={SelectField}
                  options={[]}
                  itemRef={'customers'}
                ></Field>
              </FormField>

              <FormField label='Industry' labelFor='industry'>
                <Field
                  name='industry'
                  id='industry'
                  component={SelectField}
                  options={[]}
                  itemRef={'industries'}
                ></Field>
              </FormField>

              <FormField label='Products' labelFor='products'>
                <Field
                  name='products'
                  id='products'
                  itemRef={'products'}
                  options={[]}
                  component={SelectFieldMany}
                ></Field>
              </FormField>

              <FormField label='ColorCodes' labelFor='color_codes'>
                <Field
                  name='color_codes'
                  id='color_codes'
                  itemRef={'color_codes'}
                  options={[]}
                  component={SelectFieldMany}
                ></Field>
              </FormField>

              <FormField label='BrandStyle' labelFor='brand_style'>
                <Field
                  name='brand_style'
                  id='brand_style'
                  component={SelectField}
                  options={[]}
                  itemRef={'brand_styles'}
                ></Field>
              </FormField>

              <FormField label='Answers' hasTextareaHeight>
                <Field name='answers' as='textarea' placeholder='Answers' />
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='status' id='status' component='select'>
                  <option value='pending'>pending</option>

                  <option value='processing'>processing</option>

                  <option value='completed'>completed</option>

                  <option value='canceled'>canceled</option>
                </Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/orders/orders-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

OrdersNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_ORDERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default OrdersNew;
