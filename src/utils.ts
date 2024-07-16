export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const defaultMutationState = ({ mutation } = { mutation: {} }) => {
  return {
    mutation,
    data: null,
    status: "idle",
    fetchCount: 0,
    isPending: false,
    isRefreshing: false,
    hasError: false,
    error: null,
  };
};

export const defaultQueryState = () => {
  return {
    data: null,
    status: "idle",
    fetchCount: 0,
    isPending: false,
    isRefreshing: false,
    hasError: false,
    error: null,
  };
};
export const pendingState = (
  { data, fetchCount, mutation } = {
    data: null,
    fetchCount: 0,
    mutation: undefined,
  }
) => {
  return {
    isPending: true,
    hasError: false,
    error: null,
    status: "pending",
    fetchCount: fetchCount,
    mutation,
    data,
  };
};

export const errorState = ({ error, mutation }) => {
  return {
    data: null,
    status: "error",
    fetchCount: 0,
    isPending: false,
    isRefreshing: false,
    hasError: true,
    error,
    mutation: mutation ?? undefined,
  };
};

export const successState = ({ data, fetchCount, mutation }) => {
  return {
    data,
    status: "success",
    fetchCount: fetchCount ?? 0,
    isPending: false,
    isRefreshing: false,
    hasError: false,
    error: null,
    mutation: mutation ?? undefined,
  };
};
