const sampleLog = [
    {
        "@timestamp": "2023-04-18 15:32:46.721",
        "@message": "END RequestId: ea643eb8-1547-41f5-8c51-4ff6abe3e0d1\n",
        "@logStream": "2023/04/18/[$LATEST]2a9d1984cf9d476ca0657779c35a92e0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:32:46.721",
        "@message": "REPORT RequestId: ea643eb8-1547-41f5-8c51-4ff6abe3e0d1\tDuration: 20.39 ms\tBilled Duration: 21 ms\tMemory Size: 128 MB\tMax Memory Used: 57 MB\tInit Duration: 178.50 ms\t\nXRAY TraceId: 1-643eb81e-7b15c13c3bff33247638ad8d\tSegmentId: 4c72ac137fd02fb0\tSampled: true\t\n",
        "@logStream": "2023/04/18/[$LATEST]2a9d1984cf9d476ca0657779c35a92e0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:32:46.703",
        "@message": "2023-04-18T15:32:46.703Z\tea643eb8-1547-41f5-8c51-4ff6abe3e0d1\tINFO\tRunning again at  2023-04-18T15:32:46.702Z\n",
        "@logStream": "2023/04/18/[$LATEST]2a9d1984cf9d476ca0657779c35a92e0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:32:46.702",
        "@message": "2023-04-18T15:32:46.702Z\tea643eb8-1547-41f5-8c51-4ff6abe3e0d1\tINFO\tReceived event: {\n  \"key1\": \"hello world\"\n}\n",
        "@logStream": "2023/04/18/[$LATEST]2a9d1984cf9d476ca0657779c35a92e0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:32:46.701",
        "@message": "START RequestId: ea643eb8-1547-41f5-8c51-4ff6abe3e0d1 Version: $LATEST\n",
        "@logStream": "2023/04/18/[$LATEST]2a9d1984cf9d476ca0657779c35a92e0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:32:46.698",
        "@message": "2023-04-18T15:32:46.697Z\tundefined\tINFO\tLoading function\n",
        "@logStream": "2023/04/18/[$LATEST]2a9d1984cf9d476ca0657779c35a92e0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:32:46.522",
        "@message": "INIT_START Runtime Version: nodejs:14.v29\tRuntime Version ARN: arn:aws:lambda:us-east-2::runtime:be6b7a67cb4533b2e602f284c4e41058155b081b5879c71929b33e71c124b81d\n",
        "@logStream": "2023/04/18/[$LATEST]2a9d1984cf9d476ca0657779c35a92e0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:22:46.759",
        "@message": "REPORT RequestId: ea643eb5-bd47-41f5-8c51-4ff6abe3e0d1\tDuration: 30.31 ms\tBilled Duration: 31 ms\tMemory Size: 128 MB\tMax Memory Used: 58 MB\tInit Duration: 201.04 ms\t\nXRAY TraceId: 1-643eb5c6-519368cf33b3601f33ca1925\tSegmentId: 304bc3827bc8267a\tSampled: true\t\n",
        "@logStream": "2023/04/18/[$LATEST]22bcb3249a944a3c885c613981af10cc",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:22:46.759",
        "@message": "END RequestId: ea643eb5-bd47-41f5-8c51-4ff6abe3e0d1\n",
        "@logStream": "2023/04/18/[$LATEST]22bcb3249a944a3c885c613981af10cc",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:22:46.732",
        "@message": "2023-04-18T15:22:46.732Z\tea643eb5-bd47-41f5-8c51-4ff6abe3e0d1\tINFO\tRunning again at  2023-04-18T15:22:46.731Z\n",
        "@logStream": "2023/04/18/[$LATEST]22bcb3249a944a3c885c613981af10cc",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:22:46.731",
        "@message": "2023-04-18T15:22:46.730Z\tea643eb5-bd47-41f5-8c51-4ff6abe3e0d1\tINFO\tReceived event: {\n  \"key1\": \"hello world\"\n}\n",
        "@logStream": "2023/04/18/[$LATEST]22bcb3249a944a3c885c613981af10cc",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:22:46.729",
        "@message": "START RequestId: ea643eb5-bd47-41f5-8c51-4ff6abe3e0d1 Version: $LATEST\n",
        "@logStream": "2023/04/18/[$LATEST]22bcb3249a944a3c885c613981af10cc",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:22:46.726",
        "@message": "2023-04-18T15:22:46.726Z\tundefined\tINFO\tLoading function\n",
        "@logStream": "2023/04/18/[$LATEST]22bcb3249a944a3c885c613981af10cc",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:22:46.527",
        "@message": "INIT_START Runtime Version: nodejs:14.v29\tRuntime Version ARN: arn:aws:lambda:us-east-2::runtime:be6b7a67cb4533b2e602f284c4e41058155b081b5879c71929b33e71c124b81d\n",
        "@logStream": "2023/04/18/[$LATEST]22bcb3249a944a3c885c613981af10cc",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:12:46.722",
        "@message": "END RequestId: ea643eb3-6547-41f5-8c51-4ff6abe3e0d1\n",
        "@logStream": "2023/04/18/[$LATEST]7e72c81cd4204d338d2fc53aa1a674a0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:12:46.722",
        "@message": "REPORT RequestId: ea643eb3-6547-41f5-8c51-4ff6abe3e0d1\tDuration: 26.52 ms\tBilled Duration: 27 ms\tMemory Size: 128 MB\tMax Memory Used: 57 MB\tInit Duration: 162.53 ms\t\nXRAY TraceId: 1-643eb36e-5e97e0837055cb18657c248f\tSegmentId: 0e4b3eb03e3ab649\tSampled: true\t\n",
        "@logStream": "2023/04/18/[$LATEST]7e72c81cd4204d338d2fc53aa1a674a0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:12:46.700",
        "@message": "2023-04-18T15:12:46.700Z\tea643eb3-6547-41f5-8c51-4ff6abe3e0d1\tINFO\tRunning again at  2023-04-18T15:12:46.697Z\n",
        "@logStream": "2023/04/18/[$LATEST]7e72c81cd4204d338d2fc53aa1a674a0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:12:46.697",
        "@message": "2023-04-18T15:12:46.697Z\tea643eb3-6547-41f5-8c51-4ff6abe3e0d1\tINFO\tReceived event: {\n  \"key1\": \"hello world\"\n}\n",
        "@logStream": "2023/04/18/[$LATEST]7e72c81cd4204d338d2fc53aa1a674a0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:12:46.696",
        "@message": "START RequestId: ea643eb3-6547-41f5-8c51-4ff6abe3e0d1 Version: $LATEST\n",
        "@logStream": "2023/04/18/[$LATEST]7e72c81cd4204d338d2fc53aa1a674a0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    },
    {
        "@timestamp": "2023-04-18 15:12:46.692",
        "@message": "2023-04-18T15:12:46.692Z\tundefined\tINFO\tLoading function\n",
        "@logStream": "2023/04/18/[$LATEST]7e72c81cd4204d338d2fc53aa1a674a0",
        "@log": "637410497107:/aws/lambda/run-every-10-minutes"
    }
]

export default sampleLog;