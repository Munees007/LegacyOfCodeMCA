export const questions = [
  {
    question1: {
      title: "Check if Two Strings are Anagrams",
      content: {
        problem:
          "Write a program to determine if two given strings are anagrams of each other. An anagram is formed by rearranging the characters of one string to produce another.",
        input: "Two strings `str1` and `str2`.",
        output:
          "Return `Strings are anagram` if the two strings are anagrams. Return `Strings are not a anagram` if they are not.",
        example1: {
          input: 'str1 = "listen" str2 = "silent"',
          output: "Strings are anagram",
        },
        example2: {
          input: "",
          output: "",
        },
      },
    },
    question2: {
      title: "Find the Second Largest Value in an Array",
      content: {
        problem:
          "Given an array `arr`, write a program to find the second largest value in the array. If the array has fewer than two distinct values, return a suitable message indicating that a second largest value cannot be determined.",
        input: "An array of integers, `arr`.",
        output:
          "The second largest integer in the array. If there is no second largest value, return an appropriate message such as 'No second largest value exists'.",
        example1: {
          input: "arr = [10, 20, 4, 45, 99]",
          output: "45",
        },
        example2: {
          input: "",
          output: "",
        },
      },
    },
    question3: {
      title: "Draw the Pattern",
      content: {
        problem:
          "Write a program to print the following pattern",
        input: "PROGRAM",
        output:
        "P         M\n R      A\n   O  R\n     G\n  O    R\n R       A\nP          M",
        example1: {
          input: "",
          output: "",
        },
        example2: {
          input: "",
          output: "",
        },
      },
    },
  },
  {
    question1: {
      title: "Rotate Array by Two Position Anti-Clockwise",
      content: {
        problem:
          "Given an array `arr`, rotate the array by two position in the Anti-clockwise direction. The first element of the array should move to the last position, and all other elements should shift one position to the right.",
        input: "An array of integers, `1,2,3,4,5`.",
        output:
          "An array of integers, rotated by two position in the Anti-clockwise direction.",
        example1: {
          input: "arr = [1,2,3,4,5]",
          output: "[3,4,5,1,2]",
        },
        example2: {
          input: "",
          output: "",
        },
      },
    },
    question2: {
      title: "Find the Majority Element in an Array",
      content: {
        problem:
          "Given an array `A` of `N` elements, find the majority element in the array. A majority element in an array `A` of size `N` is an element that appears strictly more than `N/2` times in the array.",
        input: "An array `[3,3,4,2,4,4,2,3,1]` of integers and its size `N`.",
        output:
          "The majority element in the array. If no majority element exists, return 'No majority element'.",
        example1: {
          input: "A = [3,3,4,2,4,4,2,4,4]",
          output: "4",
        },
        example2: {
          input: "A = [3, 3, 4, 2, 4, 4, 2, 4], N = 8",
          output: "No majority element",
        },
      },
    },
    question3: {
      title: "Merge Two Sorted Arrays Without Duplicates",
      content: {
        problem:
          "Given two sorted arrays, merge them into a single sorted array without duplicates.",
        input:
          "Two sorted arrays, `1,2,3,4,5` and `3,4,5,6,7`, where each array is sorted in ascending order.",
        output:
          "A single sorted array that contains all unique elements from both `arr1` and `arr2`.",
        example1: {
          input: "arr1 = [1, 2, 3, 4, 5], arr2 = [3, 4, 5, 6, 7]",
          output: "[1, 2, 3, 4, 5, 6, 7]",
        },
        example2: {
          input: "",
          output: "",
        },
      },
    },
  },
  {
    question1: {
      title: "Draw the Pattern",
      content: {
        problem:
          "Write a program to print the following pattern:\n1\n1 0\n1 0 1\n1 0 1 0\n1 0 1 0 1",
        input: "An integer `5` representing the number of rows.",
        output: "The binary pattern as described, with alternating 1s and 0s.",
        example1: {
          input: "n = 5",
          output: "1\n1 0\n1 0 1\n1 0 1 0\n1 0 1 0 1",
        },
        example2: {
          input: "n = 3",
          output: "1\n1 0\n1 0 1",
        },
      },
    },
    question2: {
      title: "Find the Missing Element in Array",
      content: {
        problem:
          "Given an array of size `n-1` that contains distinct integers in the range from 1 to `n`, return the missing element.",
        input:
          "An array of integers of size `n-1`, where each integer is distinct and in the range from 1 to `10`.",
        output: "An integer representing the missing element in the array.",
        example1: {
          input: "arr = [3, 7, 1, 2, 8, 4, 5]",
          output: "6",
        },
        example2: {
          input: "",
          output: "",
        },
      },
    },
    question3: {
      title: "Traverse Matrix in Snake Pattern",
      content: {
        problem:
          "Given a 3x3 matrix, traverse the matrix in a snake pattern (zigzag pattern) from left to right in odd rows and right to left in even rows.\n11 | 12 ^ 13 |\n14 | 15 ^ 16 | \n17 | 18 ^ 19 |",
        input: "A 3x3 matrix with integers.",
        output:
          "A list of integers representing the matrix elements in the snake pattern traversal, with arrows indicating the direction of traversal.",
        example1: {
          input: "Matrix\n11 12 13\n14 15 16\n17 18 19",
          output: "Matrix\n11 14 17\n18 15 12\n13 16 19",
        },
        example2: {
          input: "",
          output: "",
        },
      },
    },
  },
];
