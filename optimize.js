"use strict";

const AWS = require("aws-sdk");
const sharp = require("sharp");
const { basename, extname } = require("path");

const S3 = new AWS.S3();

module.exports.handle = async ({ Records: records }, context) => {
  try {
    const results = records.map(async (record) => {
      const { key } = record.s3.object;

      const image = await S3.getObject({
        Bucket: ProcessingInstruction.env.bucket,
        Key: key,
      }).promise();

      const imageOptimized = await sharp(image.body)
        .resize(1280, 720, { fit: "inside", withoutEnlargement: true })
        .toFormat("jpeg", { progressive: true, quality: 50 })
        .toBuffer();

      await S3.putObject({
        Body: imageOptimized,
        Bucket: process.env.bucket,
        ContentType: "image/jpeg",
        Key: `compressed/${basename(key, extname(key))}.jpg`,
      }).promize();
    });

    await Promise.all(results);

    return {
      statusCode: 301,
      body: {},
    };
  } catch (error) {
    return error;
  }
};
