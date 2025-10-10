export type CreateUserPayload = {
  name: string;
  contact: string;
  email: string;
  field: string;
};

export type FieldSelectPayload = {
  uid: string;
  field: string;
};

export type FieldAnswerPayload = {
  uid: string;
  field: string;
  questionIndex: number;
  answer: string;
  questionId: string;
};

export type FileUploadPayload = { 
  file: File;
  business_uuid: string;
};

export type AddMoreDataPayload = {
  uid: string;
  field: string;
  message: string;
};

export type DualAgentsPayload = {
  action: string;
  company_name: string;
  uid: string;
  field: string;
};
