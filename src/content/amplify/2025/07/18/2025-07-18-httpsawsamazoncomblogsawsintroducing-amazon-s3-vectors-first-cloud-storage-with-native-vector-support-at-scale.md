---
author: Amazon Web Services
cover_image: >-
  https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/07/08/Amazon_S3_Vectors.png
date: '2025-07-19T00:34:46.235Z'
dateFolder: 2025/07/18
description: >-
  Amazon S3 Vectors is a new cloud object store that provides native support for
  storing and querying vectors at massive scale, offering up to 90% cost
  reduction compared to conventional approaches while seamlessly integrating
  with Amazon Bedrock Knowledge Bases, SageMaker, and OpenSearch for AI
  applications.
isBasedOn: >-
  https://aws.amazon.com/blogs/aws/introducing-amazon-s3-vectors-first-cloud-storage-with-native-vector-support-at-scale/
link: >-
  https://aws.amazon.com/blogs/aws/introducing-amazon-s3-vectors-first-cloud-storage-with-native-vector-support-at-scale/
slug: >-
  2025-07-18-httpsawsamazoncomblogsawsintroducing-amazon-s3-vectors-first-cloud-storage-with-native-vector-support-at-scale
tags:
  - ai
  - tech
title: >-
  Introducing Amazon S3 Vectors: First cloud storage with native vector support
  at scale (preview)
---
<table> <tbody> <tr> <td> <figure><audio controls=""> </audio></figure> </td> </tr> </tbody> </table>
<p>Today, we’re announcing the preview of <a href="https://aws.amazon.com/s3/features/vectors/">Amazon S3 Vectors,</a> a purpose-built durable vector storage solution that can reduce the total cost of uploading, storing, and querying vectors by up to 90 percent. Amazon S3 Vectors is the first cloud object store with native support to store large vector datasets and provide subsecond query performance that makes it affordable for businesses to store AI-ready data at massive scale.</p>
<p>Vector search is an emerging technique used in <a href="https://aws.amazon.com/generative-ai/">generative AI</a> applications to find similar data points to given data by comparing their vector representations using distance or similarity metrics. Vectors are numerical representation of unstructured data created from <a href="https://aws.amazon.com/what-is/embeddings-in-machine-learning/">embedding models</a>. You generate vectors using embedding models for fields inside your document and store vectors into S3 Vectors to search semantically.</p>
<figure><img alt="" src="https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/07/11/2025-s3-vector-1-vector-overview.png"/></figure>
<p>S3 Vectors introduces vector buckets, a new bucket type with a dedicated set of APIs to store, access, and query vector data without provisioning any infrastructure. When you create an S3 vector bucket, you organize your vector data within vector indexes, making it simple for running similarity search queries against your dataset. Each vector bucket can have up to 10,000 vector indexes, and each vector index can hold tens of millions of vectors.</p>
<p>After creating a vector index, when adding vector data to the index, you can also attach metadata as key-value pairs to each vector to filter future queries based on a set of conditions, for example, dates, categories, or user preferences. As you write, update, and delete vectors over time, S3 Vectors automatically optimizes the vector data to achieve the best possible price-performance for vector storage, even as the datasets scale and evolve.</p>
<figure><img alt="" src="https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/07/14/2025-s3-vector-1-overview-1.png"/></figure>
<p>S3 Vectors is also natively integrated with <a href="https://aws.amazon.com/bedrock/knowledge-bases/">Amazon Bedrock Knowledge Bases</a>, including within <a href="https://aws.amazon.com/sagemaker/unified-studio/">Amazon SageMaker Unified Studio</a>, for building cost-effective <a href="https://aws.amazon.com/what-is/retrieval-augmented-generation/">Retrieval-Augmented Generation (RAG)</a> applications. Through its integration with <a href="https://aws.amazon.com/opensearch-service/">Amazon OpenSearch Service</a>, you can lower storage costs by keeping infrequent queried vectors in S3 Vectors and then quickly move them to OpenSearch as demands increase or to support real-time, low-latency search operations.</p>
<p>With S3 Vectors, you can now economically store the vector embeddings that represent massive amounts of unstructured data such as images, videos, documents, and audio files, enabling scalable generative AI applications including semantic and similarity search, RAG, and build agent memory. You can also build applications to support a wide range of industry use cases including personalized recommendations, automated content analysis, and intelligent document processing without the complexity and cost of managing vector databases.</p>
<p><strong><u>S3 Vectors in action</u></strong><br/>
 To create a vector bucket, choose <strong>Vector buckets</strong> in the left navigation pane in the <a href="https://console.aws.amazon.com/s3/">Amazon S3 console</a> and then choose <strong>Create vector bucket</strong>.</p>
<p>Enter a vector bucket name and choose the encryption type. If you don’t specify an encryption type, Amazon S3 applies server-side encryption with Amazon S3 managed keys (SSE-S3) as the base level of encryption for new vectors. You can also choose server-side encryption with <a href="https://aws.amazon.com/kms/">AWS Key Management Service (AWS KMS)</a> keys (SSE-KMS). To learn more about managing your vector bucket, visit <a href="https://alpha.www.docs.aws.a2z.com/AmazonS3/latest/userguide/s3-vectors-buckets.html">S3 Vector buckets</a> in the Amazon S3 User Guide.</p>
<figure><img alt="" src="https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/07/15/2025-s3-vector-1-create-vector-bucket.png"/><figcaption>Now, you can create a vector index to store and query your vector data within your created vector bucket.</figcaption></figure>
<figure><img alt="" src="https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/07/15/2025-s3-vector-1-create-vector-index.png"/></figure>
<p>Enter a vector index name and the dimensionality of the vectors to be inserted in the index. All vectors added to this index must have exactly the same number of values.</p>
<p>For <strong>Distance metric</strong>, you can choose either <strong>Cosine</strong> or <strong>Euclidean</strong>. When creating vector embeddings, select your embedding model’s recommended distance metric for more accurate results.</p>
<figure><img alt="" src="https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/07/15/2025-s3-vector-1-create-vector-index-2-1.png"/></figure>
<p>Choose <strong>Create vector index</strong> and then you can insert, list, and query vectors.</p>
<figure><img alt="" src="https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/07/10/2025-s3-vector-1-list-vector-bucket-2.png"/></figure>
<p>To insert your vector embeddings to a vector index, you can use the <a href="https://aws.amazon.com/cli">AWS Command Line Interface (AWS CLI)</a>, <a href="https://aws.amazon.com/developer/tools/">AWS SDKs</a>, or <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html">Amazon S3 REST API</a>. To generate vector embeddings for your unstructured data, you can use embedding models offered by Amazon Bedrock.</p>
<p>If you’re using the latest AWS Python SDKs, you can generate vector embeddings for your text using Amazon Bedrock using following code example:</p>
<pre><code># Generate and print an embedding with Amazon Titan Text Embeddings V2.
import boto3 
import json 

# Create a Bedrock Runtime client in the AWS Region of your choice. 
bedrock= boto3.client("bedrock-runtime", region_name="us-west-2") 

The text strings to convert to embeddings.
texts = [
"Star Wars: A farm boy joins rebels to fight an evil empire in space", 
"Jurassic Park: Scientists create dinosaurs in a theme park that goes wrong",
"Finding Nemo: A father fish searches the ocean to find his lost son"]

embeddings=[]
#Generate vector embeddings for the input texts
for text in texts:
        body = json.dumps({
            "inputText": text
        })    
        # Call Bedrock's embedding API
        response = bedrock.invoke_model(
        modelId='amazon.titan-embed-text-v2:0',  # Titan embedding model 
        body=body)   
        # Parse response
        response_body = json.loads(response['body'].read())
        embedding = response_body['embedding']
        embeddings.append(embedding)</code></pre>
<p>Now, you can insert vector embeddings into the vector index and query vectors in your vector index using the query embedding:</p>
<pre><code># Create S3Vectors client
s3vectors = boto3.client('s3vectors', region_name='us-west-2')

# Insert vector embedding
s3vectors.put_vectors( vectorBucketName="channy-vector-bucket",
  indexName="channy-vector-index", 
  vectors=[
{"key": "v1", "data": {"float32": embeddings[0]}, "metadata": {"id": "key1", "source_text": texts[0], "genre":"scifi"}},
{"key": "v2", "data": {"float32": embeddings[1]}, "metadata": {"id": "key2", "source_text": texts[1], "genre":"scifi"}},
{"key": "v3", "data": {"float32": embeddings[2]}, "metadata": {"id": "key3", "source_text":  texts[2], "genre":"family"}}
],
)

#Create an embedding for your query input text
# The text to convert to an embedding.
input_text = "List the movies about adventures in space"

# Create the JSON request for the model.
request = json.dumps({"inputText": input_text})

# Invoke the model with the request and the model ID, e.g., Titan Text Embeddings V2. 
response = bedrock.invoke_model(modelId="amazon.titan-embed-text-v2:0", body=request)

# Decode the model's native response body.
model_response = json.loads(response["body"].read())

# Extract and print the generated embedding and the input text token count.
embedding = model_response["embedding"]

# Performa a similarity query. You can also optionally use a filter in your query
query = s3vectors.query_vectors( vectorBucketName="channy-vector-bucket",
  indexName="channy-vector-index",
  queryVector={"float32":embedding},
  topK=3, 
  filter={"genre":"scifi"},
  returnDistance=True,
  returnMetadata=True
  )
results = query["vectors"]
print(results)
</code></pre>
<p>To learn more about inserting vectors into a vector index, or listing, querying, and deleting vectors, visit <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-vectors.html">S3 vector buckets</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-index.html">S3 vector indexes</a> in the Amazon S3 User Guide. Additionally, with the S3 Vectors embed command line interface (CLI), you can create vector embeddings for your data using Amazon Bedrock and store and query them in an S3 vector index using single commands. For more information, see the <a href="https://github.com/awslabs/s3vectors-embed-cli">S3 Vectors Embed CLI GitHub repository</a>.</p>
<p><strong><u>Integrate S3 Vectors with other AWS services</u></strong><br/>
 S3 Vectors integrates with other AWS services such as Amazon Bedrock, Amazon SageMaker, and Amazon OpenSearch Service to enhance your vector processing capabilities and provide comprehensive solutions for AI workloads.</p>
<p><strong>Create Amazon Bedrock Knowledge Bases with S3 Vectors</strong><br/>
 You can use S3 Vectors in Amazon Bedrock Knowledge Bases to simplify and reduce the cost of vector storage for RAG applications. When creating a knowledge base in the <a href="https://console.aws.amazon.com/bedrock/home#knowledge-bases">Amazon Bedrock console</a>, you can choose the S3 vector bucket as your vector store option.</p>
<p>In <strong>Step 3</strong>, you can choose the <strong>Vector store creation method</strong> either to create an S3 vector bucket and vector index or choose the existing S3 vector bucket and vector index that you’ve previously created.</p>
<p>For detailed step-by-step instructions, visit <a href="https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-create.html">Create a knowledge base by connecting to a data source in Amazon Bedrock Knowledge Bases</a> in the Amazon Bedrock User Guide.</p>
<p><strong>Using Amazon SageMaker Unified Studio<br/>
</strong>You can create and manage knowledge bases with S3 Vectors in Amazon SageMaker Unified Studio when you build your generative AI applications through Amazon Bedrock. SageMaker Unified Studio is available in the next generation of Amazon SageMaker and provides a unified development environment for data and AI, including building and texting generative AI applications that use Amazon Bedrock knowledge bases.</p>
<figure><img alt="" src="https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/07/15/2025-s3-vector-3-create-bedrock-kb-sagemaker-unified-studio-1.jpg"/></figure>
<p>You can choose your knowledge bases using the S3 Vectors created through Amazon Bedrock when you build generative AI applications. To learn more, visit <a href="https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-sources.html">Add a data source to your Amazon Bedrock app</a> in the Amazon SageMaker Unified Studio User Guide.</p>
<p><strong>Export S3 vector data to Amazon OpenSearch Service<br/>
</strong>You can balance cost and performance by adopting a tiered strategy that stores long-term vector data cost-effectively in Amazon S3 while exporting high priority vectors to OpenSearch for real-time query performance.</p>
<p>This flexibility means your organizations can access OpenSearch’s high performance (high QPS, low latency) for critical, real-time applications, such as product recommendations or fraud detection, while keeping less time-sensitive data in S3 Vectors.</p>
<p>To export your vector index, choose <strong>Advanced search export</strong>, then choose <strong>Export to OpenSearch</strong> in the Amazon S3 console.</p>
<figure><img alt="" src="https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/07/08/2025-s3-vector-1-list-vector-bucket.png"/></figure>
<p>Then, you will be brought to the <a href="https://console.aws.amazon.com/aos/home?#opensearch/integrations/s3-vector/">Amazon OpenSearch Service Integration console</a> with a template for S3 vector index export to OpenSearch vector engine. Choose <strong>Export</strong> with pre-selected S3 vector source and a service access role.</p>
<p>It will start the steps to create a new OpenSearch Serverless collection and migrate data from your S3 vector index into an OpenSearch knn index.</p>
<p>Choose the <strong>Import history</strong> in the left navigation pane. You can see the new import job that was created to make a copy of vector data from your S3 vector index into the OpenSearch Serverless collection.</p>
<p>Once the status changes to <strong>Complete</strong>, you can <a href="https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-getting-started.html#serverless-gsg-index">connect to the new OpenSearch serverless collection</a> and <a href="https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html">query your new OpenSearch knn index</a>.</p>
<p>To learn more, visit <a href="https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-collections.html">Creating and managing Amazon OpenSearch Serverless collections</a> in the Amazon OpenSearch Service Developer Guide.</p>
<p><strong><u>Now available<br/>
</u></strong><a href="https://aws.amazon.com/s3/features/vectors/">Amazon S3 Vectors</a>, and its integrations with Amazon Bedrock, Amazon OpenSearch Service, and Amazon SageMaker are now in preview in the US East (N. Virginia), US East (Ohio), US West (Oregon), Europe (Frankfurt), and Asia Pacific (Sydney) Regions.</p>
<p>Give S3 Vectors a try in the <a href="https://console.aws.amazon.com/s3">Amazon S3 console</a> today and send feedback to <a href="https://repost.aws/tags/TADSTjraA0Q4-a1dxk6eUYaw/amazon-simple-storage-service">AWS re:Post for Amazon S3</a> or through your usual AWS Support contacts.</p>
<p>— <a href="https://twitter.com/channyun">Channy</a></p>
