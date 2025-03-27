export const generateVideoSuccessful = {
  status: 'EXECUTING',
  runId: 'run_4m417pd9zh7w2igs5kcyt',
  projectId: 'd9fdf052-b084-4af8-988a-406470a1f3b5',
  isCompleted: false,
  isSuccess: false,
  cost: 0.1973347976147301,
  paymentSource: 'XNO',
  transactionDetails: {
    id: 'video-1743104860190',
    timestamp: 1743104860190,
    type: 'video',
    cost: 0.1973347976147301,
    paymentSource: 'XNO',
    tenant: 'main',
    transferdata: { model: 'longstories' }
  }
}

export const statusPendingSuccessful = {
  data: {
    status: 'QUEUED',
    isCompleted: false,
    isSuccess: false,
    output: null,
    error: null,
    projectId: 'd9fdf052-b084-4af8-988a-406470a1f3b5'
  },
  requestId: '914a7b64-3704-4996-8a40-def6e888bb26',
  paymentSource: 'USD'
}

export const statusCompletedSuccessful = {
  data: {
    status: 'COMPLETED',
    isCompleted: true,
    isSuccess: true,
    output: {
      url: 'https://s3.us-east-1.amazonaws.com/remotionlambda-useast1-hz34hfca77/renders/fxk0iwv8q1/out.mp4',
      size: 3248950
    },
    error: null,
    projectId: 'd9fdf052-b084-4af8-988a-406470a1f3b5'
  },
  requestId: '87b86b81-918e-44cf-a3ac-530618f9496b',
  paymentSource: 'USD'
}
