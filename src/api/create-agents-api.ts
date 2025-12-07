import axios from "axios";
import {
  AddMoreDataPayload,
  CreateUserPayload,
  DualAgentsPayload,
  FieldAnswerPayload,
  FieldSelectPayload,
  FileUploadPayload,
} from "./dto/agent.dto";

const NestBaseUrl = process.env.REACT_APP_NEST_API;
const FileUploadUrl = process.env.FAST_API_FILE_UPLOAD_URL || 'https://fastapi-rag-service-iuxrsvfyvq-uc.a.run.app/v1/documents/ingest/csv';
const API_URL = `${NestBaseUrl}/business`;
const DjangoBaseUrl = process.env.REACT_APP_DJANGO_API;

// ---------- API Functions ----------
export async function createBusiness(
  payload: CreateUserPayload,
  token?: string
) {
  const { data } = await axios.post(`${API_URL}/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function selectField(payload: FieldSelectPayload) {
  const { data } = await axios.post(`${API_URL}/fields/select`, payload);
  return data;
}

export async function answerFieldQuestion(payload: FieldAnswerPayload) {
  const { data } = await axios.post(`${API_URL}/fields/answer`, payload);
  return data;
}

export async function uploadFile(payload: FileUploadPayload, token?: string) {
  const formData = new FormData();
  formData.append("csv_file", payload.file);
  formData.append("business_uuid", payload.business_uuid);

  const { data } = await axios.post(
    `${FileUploadUrl}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  //update mongoDB
  const updatedBusiness = await axios.put(
    `${API_URL}`,
    { csvUploaded: true },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return updatedBusiness;
}

export async function fetchMyBusiness(token: string) {
  const { data } = await axios.get(`${API_URL}/my-business`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
