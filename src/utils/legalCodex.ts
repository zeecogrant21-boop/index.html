/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

export interface LegalArticle {
  articleNumber: string;
  title: string;
  statutes: string[];
  summary: string;
  fullLegalText: string;
}

export const ZEECO_GRANT_LEGAL_CODEX: LegalArticle[] = [
  {
    articleNumber: 'ARTICLE I',
    title: 'SOLE PROPRIETARY OWNERSHIP & EXCLUSIVE TITLE',
    statutes: ['17 U.S.C. § 101 et seq.', 'Jamaican Copyright Act 1993', 'Berne Convention Art. 2'],
    summary: 'Zeeco Grant possesses sole, unconditional, and unencumbered legal and beneficial title to ZG Personal AI, its Main Brain architecture, and all knowledge packs.',
    fullLegalText: `All worldwide rights, titles, ownership interests, and intellectual property in and to the ZG Personal AI system—including without limitation its supreme Main Brain cognitive engine, subordinate Co-Pilot algorithms, KnowledgeStore schemas, mathematical solver engines, parish geographic matrices, and compiled zg_knowledge.txt assets—are vested solely, perpetually, and exclusively in ZEECO GRANT. No license, conveyancing, implied transfer, or shop-right is granted to any other person, entity, cloud provider, or automated scraping system.`
  },
  {
    articleNumber: 'ARTICLE II',
    title: 'STRICT PROHIBITION AGAINST REVERSE ENGINEERING & DECOMPILATION',
    statutes: ['18 U.S.C. § 1030 (CFAA)', '17 U.S.C. § 1201 (DMCA)', 'Defend Trade Secrets Act (DTSA)'],
    summary: 'Complete civil and criminal ban on disassembling, decompiling, memory-dumping, AST parsing, or model-extracting any code or knowledge packs.',
    fullLegalText: `Any individual, corporation, organization, AI crawler, automated crawler bot, or automated agent is strictly and irrevocably prohibited from: (a) decompiling, disassembling, reverse engineering, or attempting to reconstruct the source code, heuristics, internal knowledge packs, or database structure; (b) intercepting, snooping, or capturing runtime memory buses between the Main Brain and Co-Pilot; (c) extracting, scraping, or utilizing the knowledge databases to train external models without express notarized written covenant from Zeeco Grant.`
  },
  {
    articleNumber: 'ARTICLE III',
    title: 'CRIMINAL ANTI-PIRACY & LIQUIDATED STATUTORY DAMAGES ($50,000,000 USD)',
    statutes: ['18 U.S.C. § 2319', 'Uniform Trade Secrets Act § 3', 'Jamaica Forgery Act'],
    summary: 'Pre-agreed liquidated statutory damages penalty of $50,000,000 USD per unauthorized duplication, distribution, or code theft occurrence.',
    fullLegalText: `In the event of willful infringement, code theft, unauthorized commercial duplication, unauthorized public repository upload, or unlawful commercial deployment of ZG Personal AI or any portion thereof, the infringing party expressly agrees that damages are difficult to ascertain and shall be liable to ZEECO GRANT for liquidated statutory damages in the predetermined sum of FIFTY MILLION UNITED STATES DOLLARS ($50,000,000.00 USD) per violation, in addition to actual damages, lost profits, punitive damages, and immediate injunctive relief.`
  },
  {
    articleNumber: 'ARTICLE IV',
    title: 'PERSONAL USE PROTOTYPE RESTRICTION & ZERO RESALE BAN',
    statutes: ['Uniform Commercial Code (UCC) § 2-316', 'Restatement (Second) of Contracts'],
    summary: 'The application is licensed exclusively as a non-commercial personal prototype for Zeeco Grant. Resale, subleasing, and rental are void ab initio.',
    fullLegalText: `This software is created, designated, and restricted strictly as a personal prototype for the private, confidential experimentation and personal use of ZEECO GRANT. Commercial exploitation, sale, auction, subleasing, time-sharing, Software-as-a-Service (SaaS) white-labeling, or distribution to third parties is strictly barred and legally void ab initio. Any attempt to convey or resell this application terminates all rights instantly.`
  },
  {
    articleNumber: 'ARTICLE V',
    title: 'CRYPTOGRAPHIC WATERMARK PROTECTION & CRIMINAL PENALTIES FOR TAMPERING',
    statutes: ['17 U.S.C. § 1202 (Integrity of Copyright Management Information)'],
    summary: 'Tampering with, altering, or obfuscating the Zeeco Grant watermark or SHA256 cryptographic seal is a federal statutory offense.',
    fullLegalText: `The cryptographic digital signature "SHA256-ZG-ZEECO-GRANT-VERIFIED", the background watermark ribbons, and the export metadata headers constitute Copyright Management Information (CMI) protected under 17 U.S.C. § 1202. Knowingly removing, altering, stripping, or concealing said digital watermarks to induce or facilitate infringement subjects the perpetrator to civil damages and criminal penalties under federal and international law.`
  },
  {
    articleNumber: 'ARTICLE VI',
    title: 'TRADE SECRET PROTECTION FOR KNOWLEDGE PACKS & MAIN BRAIN ROUTING',
    statutes: ['18 U.S.C. § 1836 (DTSA)', 'Uniform Trade Secrets Act (UTSA)'],
    summary: 'All internal architectures, token mappings, and Main Brain delegation protocols are protected trade secrets.',
    fullLegalText: `The specific structural arrangement of the 14 Jamaican parishes, Jamaican history packs, mathematical solving step-by-step algorithms, and the hierarchical separation between the Main Brain and Co-Pilot constitute proprietary trade secrets of Zeeco Grant. All reasonable measures have been implemented to maintain confidentiality, and misappropriation will be pursued under both civil and criminal trade secret statutes.`
  },
  {
    articleNumber: 'ARTICLE VII',
    title: 'ABSOLUTE "AS-IS" DISCLAIMER OF ALL WARRANTIES',
    statutes: ['UCC § 2-316', 'Magnuson-Moss Warranty Act'],
    summary: 'Software delivered "AS-IS" without warranties of merchantability, fitness for a particular purpose, uninterrupted uptime, or accuracy.',
    fullLegalText: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ZG PERSONAL AI IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITH ALL FAULTS. ZEECO GRANT MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, FREEDOM FROM PROGRAM ERRORS, DATA LOSS PREVENTION, OR UNINTERRUPTED EXECUTION.`
  },
  {
    articleNumber: 'ARTICLE VIII',
    title: 'COMPREHENSIVE LIMITATION OF LIABILITY & IMMUNITY',
    statutes: ['Restatement (Third) of Torts § 10', 'Commercial Dispute Precedents'],
    summary: 'Zeeco Grant shall have zero financial or legal liability for any damages arising out of the use or inability to use this software.',
    fullLegalText: `UNDER NO CIRCUMSTANCES SHALL ZEECO GRANT, HIS REPRESENTATIVES, OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF PROFITS, DATA LOSS, HARDWARE CORRUPTION, STORAGE DEGRADATION, BUSINESS INTERRUPTION, OR PROCUREMENT OF SUBSTITUTE GOODS) ARISING FROM THE USE OF THIS PROTOTYPE, REGARDLESS OF THE THEORY OF LIABILITY.`
  },
  {
    articleNumber: 'ARTICLE IX',
    title: 'EX-PARTE EMERGENCY INJUNCTIVE RELIEF WITHOUT BOND',
    statutes: ['Fed. R. Civ. P. 65', 'Supreme Court Equity Rules'],
    summary: 'Zeeco Grant is entitled to an immediate emergency court injunction without posting bond to halt any unauthorized dissemination.',
    fullLegalText: `Because breach of these terms causes irreparable harm for which monetary compensation alone is inadequate, Zeeco Grant shall be entitled to an immediate temporary restraining order (TRO), preliminary injunction, and permanent injunction restraining any violation or threatened violation in any court of competent jurisdiction worldwide, without the requirement of posting a bond or demonstrating monetary harm.`
  },
  {
    articleNumber: 'ARTICLE X',
    title: 'INDEMNIFICATION & REIMBURSEMENT OF FORENSIC LEGAL EXPENSES',
    statutes: ['Attorney Fees Enforcement Statutes', 'English Common Law Rule'],
    summary: 'Any infringing party must pay 100% of Zeeco Grant’s legal, attorney, forensic, and court costs.',
    fullLegalText: `Any party who initiates unauthorized distribution, reverse engineering, or infringement shall fully defend, indemnify, and hold harmless ZEECO GRANT against all losses, damages, liabilities, fines, settlements, and expenses—expressly including 100% of reasonable attorney fees, court fees, forensic investigator costs, and expert witness expenses incurred in enforcing this covenant.`
  },
  {
    articleNumber: 'ARTICLE XI',
    title: 'ZERO-TELEMETRY PRIVACY & COMPLETE SOVEREIGN AUTONOMY',
    statutes: ['General Data Protection Regulation (GDPR) Principles', 'Jamaica Data Protection Act 2020'],
    summary: 'All calculations, search logs, and database records remain strictly sandboxed and sovereign on the user’s local device.',
    fullLegalText: `ZG Personal AI guarantees complete local execution. No personal queries, biometric indicators, search logs, mathematical inputs, or parish telemetry are transmitted to third-party ad networks or surveillance brokers. StorageGuard maintains clean sandboxed operation, protecting the digital sovereignty of Zeeco Grant.`
  },
  {
    articleNumber: 'ARTICLE XII',
    title: 'GOVERNING LAW, FORUM SELECTION & JURISDICTION',
    statutes: ['WIPO Copyright Treaty', 'International Private Law Conventions'],
    summary: 'Exclusively governed under the laws of Jamaica and international intellectual property conventions.',
    fullLegalText: `This Legal Codex and all disputes arising hereunder shall be governed by and construed under the laws of Jamaica, without regard to conflict of laws principles. The Supreme Court of Jamaica in Kingston shall have exclusive primary jurisdiction, alongside any international tribunal for the enforcement of Berne Convention copyrights and WIPO treaty rights.`
  }
];
