import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/customers/customersSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const CustomersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state) => state.customers);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View customers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View customers')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>FirstName</p>
            <p>{customers?.first_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>LastName</p>
            <p>{customers?.last_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Email</p>
            <p>{customers?.email}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>PhoneNumber</p>
            <p>{customers?.phone_number}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={customers?.address}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ProfilePic</p>
            {customers?.profile_pic?.length ? (
              <ImageField
                name={'profile_pic'}
                image={customers?.profile_pic}
                className='w-20 h-20'
              />
            ) : (
              <p>No ProfilePic</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>State</p>
            <p>{customers?.state}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Country</p>
            <p>{customers?.country}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>City</p>
            <p>{customers?.city}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Password</p>
            <p>{customers?.password}</p>
          </div>

          <FormField label='IsVerified'>
            <SwitchField
              field={{ name: 'is_verified', value: customers?.is_verified }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <>
            <p className={'block font-bold mb-2'}>Orders Customer</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>OrderDate</th>

                      <th>TotalPrice</th>

                      <th>Answers</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.orders_customer &&
                      Array.isArray(customers.orders_customer) &&
                      customers.orders_customer.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/orders/orders-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='order_date'>
                            {dataFormatter.dateTimeFormatter(item.order_date)}
                          </td>

                          <td data-label='total_price'>{item.total_price}</td>

                          <td data-label='answers'>{item.answers}</td>

                          <td data-label='status'>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!customers?.orders_customer?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Payments Customer</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>PaymentDate</th>

                      <th>Amount</th>

                      <th>PaymentMethod</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.payments_customer &&
                      Array.isArray(customers.payments_customer) &&
                      customers.payments_customer.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/payments/payments-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='payment_date'>
                            {dataFormatter.dateTimeFormatter(item.payment_date)}
                          </td>

                          <td data-label='amount'>{item.amount}</td>

                          <td data-label='payment_method'>
                            {item.payment_method}
                          </td>

                          <td data-label='status'>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!customers?.payments_customer?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Tickets Customer</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>Status</th>

                      <th>CreationDate</th>

                      <th>LastUpdateDate</th>

                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.tickets_customer &&
                      Array.isArray(customers.tickets_customer) &&
                      customers.tickets_customer.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/tickets/tickets-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='status'>{item.status}</td>

                          <td data-label='creation_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.creation_date,
                            )}
                          </td>

                          <td data-label='last_update_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.last_update_date,
                            )}
                          </td>

                          <td data-label='details'>{item.details}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!customers?.tickets_customer?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/customers/customers-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

CustomersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CUSTOMERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default CustomersView;
