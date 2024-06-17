import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/brand_styles/brand_stylesSlice';
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

const Brand_stylesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { brand_styles } = useAppSelector((state) => state.brand_styles);

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
        <title>{getPageTitle('View brand_styles')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View brand_styles')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{brand_styles?.name}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={brand_styles?.description}
            />
          </FormField>

          <>
            <p className={'block font-bold mb-2'}>Orders BrandStyle</p>
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
                    {brand_styles.orders_brand_style &&
                      Array.isArray(brand_styles.orders_brand_style) &&
                      brand_styles.orders_brand_style.map((item: any) => (
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
              {!brand_styles?.orders_brand_style?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/brand_styles/brand_styles-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Brand_stylesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_BRAND_STYLES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Brand_stylesView;
