import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  tripFormSchema,
  type TripFormData,
  type TripFormSchema,
} from '../../schemas/tripSchema';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Textarea from '../../ui/TextArea';
import Select from '../../ui/Select';
import ButtonText from '../../ui/ButtonText';
import { useMoveBack } from '../../api/hooks/useBack';
import TripStatus from '../../ui/TripStatus';
import Heading from '../../ui/Heading';
import AlertsContainer from '../../ui/AlertsContainer';
import { Panel } from '../../ui/Panel';
import { useTripMutations } from '../../api/hooks/useTripMutations';
import { BiTimer } from 'react-icons/bi';
import { formatDate } from '../../util/util';
import { useTravellers } from '../../api/hooks/useTravellers';

type SelectOption = {
  value: string;
  text: string;
};

type Props = {
  trip: Trip;
  tripCreated?: () => void;
  tripUpdated?: () => void;
  alerts?: Alert[] | null;
  clockStart?: Date | null;
};

const FormColumn = styled.div`
  display: 'flex';
  flex-grow: 1;
  flex-direction: 'column';
`;

const FormStack = styled.div``;

export default function TripForm({ trip, alerts, clockStart }: Props) {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { createTrip, updateTrip, reopenTrip, closeTrip, cancelTrip } =
    useTripMutations();
  const { travellers, loadingTravellers } = useTravellers();

  const defaultvalues: TripFormSchema = {
    id: trip.id,
    travellerId: trip.travellerId,
    fromDate: trip.fromDate,
    toDate: trip.toDate,
    location: trip.location,
    description: trip.description,
    approvedDate: trip.approvedDate,
    statusId: trip.statusId,
    fiduciary: 'MCSO',
    submittedDate: trip.submittedDate,
    reimbursementSentDate: trip.reimbursementSentDate,
    reimbursementPaidDate: trip.reimbursementPaidDate,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    getValues,
    setValue,
  } = useForm<TripFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(tripFormSchema),
    defaultValues: defaultvalues,
  });

  const onSubmit = async (data: TripFormData) => {
    try {
      if (data.id === 0) {
        await createTrip.mutateAsync(data, {
          onSuccess: (id) => navigate(`/trips/${id}`),
        });
      } else {
        await updateTrip.mutateAsync(data, {
          onSuccess: () => {
            const id = data.id;
            navigate(`/trips/${id}`);
          },
        });
      }
    } catch (error) {
      alert(error);
      console.log('error', error);
    }
  };

  function onError<TripFromData>(errors: TripFromData | undefined) {
    console.log('errors', errors, getValues());
  }

  // const fiduciaryChanged = (e: ChangeEvent<HTMLSelectElement>) => {
  //   // trip.fiduciary = e.target.value;
  //   // setValue('fiduciary', e.target.value);
  // };

  // const travellerChanged = (e: ChangeEvent<HTMLSelectElement>) => {
  //   // trip.fiduciary = e.target.value;
  //   // setValue('fiduciary', e.target.value);
  // };

  function getStatus(statusId: number) {
    if (statusId == 1) return 'Open';
    if (statusId == 2) return 'Closed';
    if (statusId == 3) return 'Cancelled';
    return 'unknown';
  }

  useEffect(() => {
    setValue('fiduciary', trip.fiduciary);
    setValue('travellerId', trip.travellerId);
  }, [setValue, trip.fiduciary, trip.travellerId]);

  if (loadingTravellers) return <div>Loading...</div>;

  const isDisabled = trip.statusId != 1;

  return (
    <>
      <div className="flex justify-between w-full">
        <Heading as="h4">
          <div className="flex gap-22 align-middle">
            {trip.id == 0 ? 'Create Trip' : 'Edit Trip'}
            {trip.id !== 0 && (
              <div className="w-[6rem] self-center text-sm">
                <TripStatus status={getStatus(trip.statusId)}>
                  {getStatus(trip.statusId)}
                </TripStatus>
              </div>
            )}
          </div>
        </Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </div>
      {trip.id !== 0 && (
        <div className=" mb-3 w-[34rem]">
          <FormRow label="Trip Id" id="id">
            <Input
              type="text"
              disabled={true}
              value={trip.id}
              id="id"
              style={{
                backgroundColor: 'transparent',
                paddingLeft: '0',
                border: 0,
              }}
            ></Input>
          </FormRow>
        </div>
      )}
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={'flex flex-col w-full'}>
          <FormStack className="flex justify-between ">
            <FormColumn className="grow-1">
              <FormRow label="Traveller" id="travellerId">
                <Select
                  {...register('travellerId')}
                  id="travellerId"
                  type="dark"
                  // onChange={travellerChanged}
                  options={travellers!.map((t) => {
                    return {
                      value: t.id.toString(),
                      text: t.firstName + ' ' + t.lastName,
                    } as SelectOption;
                  })}
                  disabled={isDisabled}
                ></Select>
              </FormRow>

              <div className="my-7"></div>
              <FormRow
                label="Trip Start Date"
                id="fromDate"
                error={errors?.fromDate?.message}
                useMessage={true}
              >
                <Controller
                  control={control}
                  name="fromDate"
                  render={({ field }) => (
                    <DatePicker
                      {...register('fromDate')}
                      wrapperClassName="w-full"
                      id="fromDate"
                      selected={field.value ? new Date(field.value) : null}
                      dateFormat="MM/dd/yyyy"
                      onBlur={field.onBlur} // Important for validation
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      className="border border-gray-700 rounded-sm py-[.5rem] px-[.9rem] text-end w-[15rem]"
                      disabled={isDisabled}
                    />
                  )}
                ></Controller>
              </FormRow>
              <FormRow
                label="Trip End Date"
                id="toDate"
                error={errors?.toDate?.message}
                useMessage={true}
              >
                <Controller
                  control={control}
                  name="toDate"
                  render={({ field }) => (
                    <DatePicker
                      {...register('toDate')}
                      id="toDate"
                      wrapperClassName="w-full"
                      selected={field.value ? new Date(field.value) : null}
                      dateFormat="MM/dd/yyyy"
                      onBlur={field.onBlur} // Important for validation
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      className="border border-gray-700 rounded-sm py-[.5rem] px-[.9rem] text-end w-[15rem]"
                      disabled={isDisabled}
                    />
                  )}
                ></Controller>
              </FormRow>
              <div className="my-7"></div>
              <FormRow
                label="Approved Date"
                id="approvedDate"
                error={errors?.approvedDate?.message}
                useMessage={true}
              >
                <Controller
                  control={control}
                  name="approvedDate"
                  render={({ field }) => (
                    <DatePicker
                      wrapperClassName="w-full"
                      {...register('approvedDate')}
                      id="approvedDate"
                      selected={field.value ? new Date(field.value) : null}
                      dateFormat="MM/dd/yyyy"
                      onBlur={field.onBlur} // Important for validation
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      className="border border-gray-700 rounded-sm py-[.5rem] px-[.9rem] text-end"
                      disabled={isDisabled}
                    />
                  )}
                ></Controller>
              </FormRow>
              <FormRow
                label="Location"
                id="location"
                error={errors?.location?.message}
                useMessage={true}
              >
                <Input
                  width={'15rem'}
                  type="text"
                  id="location"
                  defaultValue={trip.location}
                  {...register('location')}
                  disabled={isDisabled}
                ></Input>
              </FormRow>
              <FormRow
                label="Description"
                id="description"
                error={errors?.description?.message}
                useMessage={true}
              >
                <Textarea
                  id="description"
                  defaultValue={trip.description}
                  {...register('description')}
                  disabled={isDisabled}
                ></Textarea>
              </FormRow>
              <FormRow label="Fiduciary" id="fiduciary">
                <Select
                  {...register('fiduciary')}
                  id="fiduciary"
                  type="dark"
                  // onChange={fiduciaryChanged}
                  options={[
                    { value: 'MCSO', text: 'MCSO' },
                    { value: 'CAM', text: 'CAM' },
                  ]}
                  disabled={isDisabled}
                ></Select>
              </FormRow>
            </FormColumn>

            <FormColumn>
              <FormRow
                label="Submitted Date"
                id="submittedDate"
                error={errors?.submittedDate?.message}
                useMessage={true}
              >
                <Controller
                  control={control}
                  name="submittedDate"
                  render={({ field }) => (
                    <DatePicker
                      {...register('submittedDate')}
                      id="submittedDate"
                      selected={field.value ? new Date(field.value) : null}
                      dateFormat="MM/dd/yyyy"
                      onBlur={field.onBlur} // Important for validation
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      className="border border-gray-700 rounded-sm py-[.5rem] px-[.9rem] text-end"
                      disabled={isDisabled}
                    />
                  )}
                ></Controller>
              </FormRow>

              <FormRow
                label="Sent Date"
                id="reimbursementSentDate"
                error={errors?.reimbursementSentDate?.message}
                useMessage={true}
              >
                <Controller
                  control={control}
                  name="reimbursementSentDate"
                  render={({ field }) => (
                    <DatePicker
                      {...register('reimbursementSentDate')}
                      id="reimbursementSentDate"
                      selected={field.value ? new Date(field.value) : null}
                      dateFormat="MM/dd/yyyy"
                      onBlur={field.onBlur} // Important for validation
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      className="border border-gray-700 rounded-sm py-[.5rem] px-[.9rem] text-end"
                      disabled={isDisabled}
                    />
                  )}
                ></Controller>
              </FormRow>

              <FormRow
                label="Paid Date"
                id="reimbursementPaidDate"
                error={errors?.reimbursementPaidDate?.message}
                useMessage={true}
              >
                <Controller
                  control={control}
                  name="reimbursementPaidDate"
                  render={({ field }) => (
                    <DatePicker
                      {...register('reimbursementPaidDate')}
                      id="reimbursementPaidDate"
                      selected={field.value ? new Date(field.value) : null}
                      dateFormat="MM/dd/yyyy"
                      onBlur={field.onBlur} // Important for validation
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      className="border border-gray-700 rounded-sm py-[.5rem] px-[.9rem] text-end"
                      disabled={isDisabled}
                    />
                  )}
                ></Controller>
              </FormRow>
            </FormColumn>

            <FormColumn className="w-1/4">
              {trip.id > 0 && (
                <Panel>
                  {trip.id > 0 && (
                    <div>
                      <Heading as={'h4'}>Notifications</Heading>
                      {clockStart && (
                        <div className="flex gap-3 mb-6">
                          <div className="border border-green-600"></div>
                          <BiTimer className="text-2xl"></BiTimer>
                          Submit clock starts on{' '}
                          {formatDate(clockStart) + ' 8:00 AM'}
                        </div>
                      )}
                      <AlertsContainer
                        alerts={alerts as Alert[] | null}
                      ></AlertsContainer>
                    </div>
                  )}
                </Panel>
              )}
            </FormColumn>
          </FormStack>
          <div className="mt-10 mr-15 flex gap-10 justify-between">
            {isValid}
            {trip.statusId == 1 && (
              <div className="flex gap-2">
                <Button
                  variation="secondary"
                  children="Cancel"
                  size="medium"
                  type="button"
                  disabled={createTrip.isPending || updateTrip.isPending}
                  onClick={() => navigate('/trips')}
                ></Button>
                <Button
                  variation="primary"
                  children="Save"
                  size="medium"
                  type="submit"
                  disabled={createTrip.isPending || updateTrip.isPending}
                ></Button>
              </div>
            )}
            <div className="flex gap-3">
              {trip.statusId == 1 && trip.id > 0 && (
                <>
                  <Button
                    variation="danger"
                    children="Close Trip"
                    size="medium"
                    type="button"
                    disabled={isValid !== undefined && !isValid}
                    onClick={() => closeTrip.mutate(trip.id.toString())}
                  ></Button>
                  <Button
                    variation="danger2"
                    children="Cancel Trip"
                    size="medium"
                    type="button"
                    disabled={isValid !== undefined && !isValid}
                    onClick={() => cancelTrip.mutate(trip.id.toString())}
                  ></Button>
                </>
              )}
              {(trip.statusId == 2 || trip.statusId == 3) && (
                <Button
                  variation="danger"
                  children="Reopen Trip"
                  size="medium"
                  type="button"
                  disabled={isValid !== undefined && !isValid}
                  onClick={() => reopenTrip.mutate(trip.id.toString())}
                ></Button>
              )}
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}
