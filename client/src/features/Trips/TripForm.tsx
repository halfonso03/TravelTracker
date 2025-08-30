import styled from 'styled-components';
import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
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
import Input from '../../ui/Input';
import Textarea from '../../ui/TextArea';
import Select from '../../ui/Select';
import { useEffect, type ChangeEvent } from 'react';
import ButtonText from '../../ui/ButtonText';
import { useMoveBack } from '../../api/hooks/useBack';
import TripStatus from '../../ui/TripStatus';
import { useTripMutations } from '../../api/useTripMutations';
import Heading from '../../ui/Heading';
import AlertsContainer from '../../ui/AlertsContainer';
import { Panel } from '../../ui/Panel';

type Props = {
  trip: Trip;
  tripCreated?: () => void;
  tripUpdated?: () => void;
};

const FormColumn = styled.div`
  display: 'flex';
  flex-grow: 1;
  flex-direction: 'column';
`;

const FormStack = styled.div``;

export default function TripForm({ trip }: Props) {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { createTrip, updateTrip, reopenTrip, closeTrip } = useTripMutations();

  const defaultvalues: TripFormSchema = {
    id: trip.id,
    travellerName: trip.travellerName,
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

  const selectionChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    trip.fiduciary = e.target.value;
    setValue('fiduciary', e.target.value);
  };

  function getStatus(statusId: number) {
    return statusId == 1 ? 'Open' : 'Closed';
  }

  useEffect(() => {
    setValue('fiduciary', trip.fiduciary);
  }, [setValue, trip.fiduciary]);

  const alerts = [
    {
      type: 1,
      message: 'Trip Ended over 5 days ago and no reimbursement submitted',
    },
    {
      type: 2,
      message: 'Trip Ended over 10 days ago and no reimbursement submitted',
    },
    {
      type: 3,
      message: 'Reimursement submitted but has not been sent',
    },
  ];

  return (
    <>
      <div className="flex justify-between w-full">
        <Heading as="h4">
          <div className="flex gap-10 align-middle">
            {trip.id == 0 ? 'Create Trip' : 'Edit Trip'}
            {trip.id !== 0 && (
              <div className="w-[4rem] self-center text-sm">
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
        <div className=" mb-3 w-[33rem]">
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
              <FormRow
                label="Traveller Name"
                id="travellerName"
                error={errors?.travellerName?.message}
                useMessage={true}
              >
                <Input
                  type="text"
                  disabled={trip.statusId == 2}
                  id="travellerName"
                  defaultValue={trip.travellerName}
                  {...register('travellerName')}
                ></Input>
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
                      disabled={trip.statusId == 2}
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
                      disabled={trip.statusId == 2}
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
                      disabled={trip.statusId == 2}
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
                  disabled={trip.statusId == 2}
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
                  disabled={trip.statusId == 2}
                ></Textarea>
              </FormRow>
              <FormRow label="Fiduciary" id="fiduciary">
                <Select
                  {...register('fiduciary')}
                  id="fiduciary"
                  type="dark"
                  onChange={selectionChanged}
                  options={[
                    { value: 'MCSO', text: 'MCSO' },
                    { value: 'CAM', text: 'CAM' },
                  ]}
                  disabled={trip.statusId == 2}
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
                      disabled={trip.statusId == 2}
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
                      disabled={trip.statusId == 2}
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
                      disabled={trip.statusId == 2}
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
                      <AlertsContainer alerts={alerts}></AlertsContainer>
                    </div>
                  )}
                </Panel>
              )}
            </FormColumn>
          </FormStack>
          <div className="mt-5 mr-15 flex gap-10 justify-end">
            {isValid}
            {trip.statusId == 1 && (
              <div className="flex gap-2">
                <Button
                  variation="secondary"
                  children="Cancel"
                  size="medium"
                  type="button"
                  disabled={createTrip.isPending || updateTrip.isPending}
                  onClick={() => navigate(-1)}
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
              </>
            )}
            {trip.statusId == 2 && (
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
      </Form>
    </>
  );
}
