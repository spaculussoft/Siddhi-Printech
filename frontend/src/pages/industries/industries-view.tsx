import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/industries/industriesSlice';
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

const IndustriesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { industries } = useAppSelector((state) => state.industries);

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
        <title>{getPageTitle('View industries')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View industries')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{industries?.name}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={industries?.description}
            />
          </FormField>

          <>
            <p className={'block font-bold mb-2'}>Orders Industry</p>
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
                    {industries.orders_industry &&
                      Array.isArray(industries.orders_industry) &&
                      industries.orders_industry.map((item: any) => (
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
              {!industries?.orders_industry?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/industries/industries-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

IndustriesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_INDUSTRIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default IndustriesView;
