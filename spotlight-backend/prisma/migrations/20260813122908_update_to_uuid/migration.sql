/*
  Warnings:

  - The primary key for the `projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `services` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `project_features` DROP FOREIGN KEY `project_features_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `project_media` DROP FOREIGN KEY `project_media_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `service_features` DROP FOREIGN KEY `service_features_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `service_media` DROP FOREIGN KEY `service_media_service_id_fkey`;

-- AlterTable
ALTER TABLE `analytics_logs` MODIFY `entity_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `messages` MODIFY `service_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `project_features` MODIFY `project_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project_media` MODIFY `project_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `projects` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `service_id` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `service_features` MODIFY `service_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `service_media` MODIFY `service_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `services` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `service_features` ADD CONSTRAINT `service_features_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_media` ADD CONSTRAINT `service_media_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_features` ADD CONSTRAINT `project_features_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_media` ADD CONSTRAINT `project_media_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
