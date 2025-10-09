import { useMutation } from "@tanstack/react-query";
import {
  createBusiness,
  selectField,
  answerFieldQuestion,
  uploadFile,
  fetchMyBusiness,
} from "../api/create-agents-api";
import {
  AddMoreDataPayload,
  CreateUserPayload,
  DualAgentsPayload,
  FieldAnswerPayload,
  FieldSelectPayload,
  FileUploadPayload,
} from "../api/dto/agent.dto";
import { useAuth } from "../context/AuthContext";

// User creation
export function useCreateBusiness() {
  const { token } = useAuth();
  return useMutation<any, any, CreateUserPayload>({
    mutationFn: (payload: CreateUserPayload) => createBusiness(payload, token!),
  });
}

// Upload file
export function useUploadFile() {
  const { token } = useAuth();
  return useMutation<any, any, FileUploadPayload>({
    mutationFn: (payload) => uploadFile(payload, token!),
  });
}

// Fetch existing business
export function useMyBusiness() {
  const { token } = useAuth();
  return useMutation({
    mutationFn: () => fetchMyBusiness(token!),
  });
}

// // Add more data (LLM)
// export function useAddMoreData() {
//   return useMutation<any, any, AddMoreDataPayload>({
//     mutationFn: addMoreData,
//   });
// }

// // Create dual agents
// export function useCreateDualAgents() {
//   return useMutation<any, any, DualAgentsPayload>({
//     mutationFn: createDualAgents,
//   });
// }

// // Select business field
// export function useSelectField() {
//   return useMutation<any, any, FieldSelectPayload>({
//     mutationFn: selectField,
//   });
// }

// // Answer field question
// export function useAnswerFieldQuestion() {
//   return useMutation<any, any, FieldAnswerPayload>({
//     mutationFn: answerFieldQuestion,
//   });
// }
