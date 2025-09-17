import axios from "axios";
import {
  AddMoreDataPayload,
  CreateUserPayload,
  DualAgentsPayload,
  FieldAnswerPayload,
  FieldSelectPayload,
  FileUploadPayload,
} from "./dto/agent.dto";

const API_URL = "http://localhost:4001/business";

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
  formData.append("file", payload.file);
  formData.append("uid", payload.uid);
  formData.append("companyName", payload.companyName);
  formData.append("field", payload.field);

  const { data } = await axios.post(
    `http://127.0.0.1:8000/chat/api/upload-file/`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

export async function addMoreData(payload: AddMoreDataPayload) {
  const { data } = await axios.post(`${API_URL}/llm/add-data`, payload);
  return data;
}

export async function createDualAgents(payload: DualAgentsPayload) {
  const { data } = await axios.post(`http://127.0.0.1:8000/chat/api/`, payload);
  return data;
}

export async function fetchMyBusiness(token: string) {
  const { data } = await axios.get(`${API_URL}/my-business`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
