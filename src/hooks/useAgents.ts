import { useMutation } from "@tanstack/react-query";
import {
  createBusiness,
  selectField,
  answerFieldQuestion,
  uploadFile,
  addMoreData,
  createDualAgents, 
  fetchMyBusiness,
} from "../api/create-agents-api";
import { AddMoreDataPayload, CreateUserPayload, DualAgentsPayload, FieldAnswerPayload, FieldSelectPayload, FileUploadPayload } from "../api/dto/auth.dto";

// User creation
export function useCreateBusiness(token: string) {
  return useMutation<any, any, CreateUserPayload>({
    mutationFn: (payload: CreateUserPayload) => createBusiness(payload, token),
  });
}

// Select business field
export function useSelectField() {
  return useMutation<any, any, FieldSelectPayload>({
    mutationFn: selectField,
  });
}

// Answer field question
export function useAnswerFieldQuestion() {
  return useMutation<any, any, FieldAnswerPayload>({
    mutationFn: answerFieldQuestion,
  });
}

// Upload file
export function useUploadFile() {
  return useMutation<any, any, FileUploadPayload>({
    mutationFn: uploadFile,
  });
}

// Add more data (LLM)
export function useAddMoreData() {
  return useMutation<any, any, AddMoreDataPayload>({
    mutationFn: addMoreData,
  });
}

// Create dual agents
export function useCreateDualAgents() {
  return useMutation<any, any, DualAgentsPayload>({
    mutationFn: createDualAgents,
  });
}

// Fetch existing business
export function useMyBusiness(token: string) {
  return useMutation({
    mutationFn: () => fetchMyBusiness(token),
  });
}

