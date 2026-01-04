
// Helper function , clean payload by removing empty strings and undefined values
const cleanPayload = (data: any) =>
  Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) => value !== '' && value !== undefined
    )
  );
export default cleanPayload;