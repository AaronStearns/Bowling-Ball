# Data manipulation
library(dplyr)

# Library containing kNN algorithm for testing
library(DMwR)

# Library to convert dataframes to json
library(rjson)

#######################################################
# CREATE TRAINING DATA FOR REACT APP ##################
#######################################################

# Generate 500 bodyweights with a mean of 
# 150 and a standard deviation of 30
bodyweight <- floor(rnorm(500, mean = 150, sd = 30))

# Generate 500 experiene levels from 1:3
experience <- sample(1:3, 500, replace=TRUE)

# Create dataframe from bodyweight and experience
data <- as.data.frame(
  cbind(bodyweight, experience))

# Generate approximate bowling ball weights by dividing bodyweight 
# by (15 - experience) and rounding up.
rawWeights <- data %>% 
  mutate(ballWeight = ceiling(bodyweight / (15 - experience))) %>% 
  select(ballWeight) %>% 
  unlist()

# Using case_when instead of if...else to set max and min ball weights 
ballWeight <- case_when(rawWeights > 16 ~ 16, rawWeights < 6 ~ 6, TRUE ~ rawWeights)

# Adding refined ball weights to dataframe
data <- cbind(data, ballWeight)

# Train kNN on 'data' dataframe and predict ballWeight for 'myInput'
myInput <- data.frame(185, 1)
colnames(myInput) <- c("bodyweight", "experience")
knnModel <- kNN(ballWeight ~ ., 
                data, 
                myInput, 
                norm = T, # normalize values from 0 to 1
                k=5)

# Write JSON object by row
bowlJSON <- toJSON(
  unname(
    split(
      data, 1:nrow(data))))

write(bowlJSON, file="bowling.JSON")