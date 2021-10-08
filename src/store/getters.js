export default {
  getData: (state) => state.data,
  getMobile: (state) => state.mobile,
  getDialogVisible: (state) => state.dialogVisible,
  getLoading: (state) => state.loading,
  getDetailsDialogVisible: (state) => state.detailsDialogVisible,
  getDatePickerVisible: (state) => state.datePickerVisible,
  getDeliveryStatus: (state) => state.deliveryStatus,
  getTimelineVisible: (state) => state.timelineVisible,
  getRecipientVisible: (state) => state.recipientVisible,
  getOrderStatuses: (state) => state.orderStatuses,
  getOrderEvents: (state) => state.orderEvents,
};
