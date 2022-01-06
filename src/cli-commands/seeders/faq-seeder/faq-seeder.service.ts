import { Injectable } from '@nestjs/common';
import { FaqRepoService } from '../../../faqs/services/faq-repo/faq-repo.service';
import { Seeder } from '../seeder';
import { TransactionProviderService } from '../../../transaction-manager/services/transaction-provider/transaction-provider.service';

@Injectable()
export class FaqSeederService extends Seeder {
  constructor(
    private faqRepoService: FaqRepoService,
    private transactionProvider: TransactionProviderService,
  ) {
    super();
  }
  FAQ = [
    {
      question: 'What are alternate ways I can donate?',
      answer:
        'If you prefer not to donate online, you may donate by check. Please make the check payable to "SIL International". Include your email address and "for Language Technology" on the memo line. Please send your check to:\n' +
        '\n' +
        'SIL International\n' +
        '7500 W. Camp Wisdom Road\n' +
        'Dallas, TX 75236-5629\n' +
        'USA\n',
      order: 1,
    },
    {
      question:
        'How does SIL International ensure my personal information is protected?',
      answer:
        'When you donate to the SIL International, we receive personal information from you. We use this data to acknowledge your donation, provide you with donation receipts, and correspond with you through newsletters or email. You can read more about what information we receive, the purposes we use that information for, and how we handle it in our Privacy Policy.\n' +
        '\n' +
        'We work hard to protect your information. We believe in, and practice, multi-layered security controls and practices, including both technical and organizational methods. We have agreements with third parties and have adopted other security measures to protect against the loss, misuse and/or unauthorized alteration of the information under our control or under the control of our service providers. The vendors receiving your information are contractually obligated to handle the data in ways that are approved by SIL International. The vendors we use to send emails or other marketing materials to you aren’t permitted to use your information for their own direct marketing purposes. They also aren’t allowed to share your data with anyone else for direct marketing purposes. In addition, we will keep your personal data only for as long as we need it to provide you services, manage our business or as required by law or contract. You can find more information in the Privacy Policy.\n' +
        '\n' +
        'Except as disclosed in our Privacy Policy, we do not share any personal data unless you expressly agree that we may do so. Finally, when you donate to SIL International through a third party like Stripe, those organizations also collect your data. Their collection and use of your data is governed by their respective privacy policies.',
      order: 2,
    },
    {
      question: 'Why do you need my address in order to process a donation?',
      answer:
        'We understand that your privacy is very important. We ask for a minimum amount of information required to process credit/debit card donations, including billing addresses. This allows our payment processor to verify your identity, process your payment, and prevent fraudulent charges to your card. We keep your information private — if you have questions, please refer to our Privacy Policy. If you would rather not fill in your information on our online donation form, you can mail a check (see What are alternate ways I can donate? earlier in this FAQ.\n',
      order: 3,
    },
    {
      question: 'How will my donation be used?',
      answer:
        'Your donation will be used to help cover the costs of developing language technology software, including paying staff and contractors, server costs, and hardware and software purchases.\n',
      order: 4,
    },
    {
      question: 'How is SIL International funded?\n',
      answer:
        "Resources for the work of SIL are provided primarily by individuals and organizations interested in SIL's work. In addition, for many of its larger projects, SIL seeks grants from a variety of other sources, both public and private. Less than one percent of its income is derived from any sort of government source.\n" +
        'If you have questions regarding contributing to SIL, or if you would like information concerning the management or finances of various projects, please feel free to contact:\n' +
        'International Finance\n' +
        'SIL International\n' +
        '7500 W. Camp Wisdom Road\n' +
        'Dallas, TX 75236\n' +
        'USATelephone: +1-972-708-7412\n' +
        'Fax: +1-972-708-7317\n' +
        'Email: langtech-finance@sil.org\n',
      order: 5,
    },
    {
      question: 'Does my donation give me access to tech support?',
      answer:
        'SIL International does not provide tech support or enhanced tech support in exchange for donation.\n',
      order: 6,
    },
    {
      question: 'Is my donation tax deductible?',
      answer:
        'Contributions go to SIL International, a 501(c)(3) organization based in Dallas, Texas, to be used in its discretion for its charitable purposes. They are tax-deductible in the U.S. to the fullest extent permitted by law.\n' +
        'For donors outside of the United States, please consult with your tax adviser about whether your donation is tax deductible.\n',
      order: 7,
    },
    {
      question: 'How can I get a receipt for U.S. tax preparation purposes?\n',
      answer:
        'If you give to SIL International online, you should immediately receive an emailed receipt for your donation that you can use for your U.S. tax preparation purposes. Please check your spam folder if you don’t see that email arrive in your inbox. If you need an additional copy of your receipt for your U.S. tax preparation purposes, please contact us at langtech-finance@sil.org.\n',
      order: 8,
    },
    {
      question:
        'Can I donate in a currency other than United States dollars?\n',
      answer:
        'Yes. On our online form, use the drop down menu on the form to select alternate currencies.\n',
      order: 9,
    },
    {
      question:
        'I’m unable to give money at this time, are there other ways I can help Language Technology?\n',
      answer:
        'Absolutely! We understand that not everyone can support our mission financially, but there are many ways to help with the Language Technology and be a part of our community. In fact, the success of our mission depends on participation from people like you. If you have a bug report, feature suggestion, need help using our software, or would like to help develop it please contact us using this form.\n',
      order: 10,
    },
    {
      question: 'Who can I email directly with questions about donating?\n',
      answer:
        'If you have a question about donating to SIL International, please contact us at langtech-finance@sil.org. We will do our best to follow-up with you within 72 hours.\n',
      order: 11,
    },
    {
      question: 'When I make a donation, how long do you retain my data?\n',
      answer:
        'Generally speaking, only long enough to do what we collected it for. Please refer to our Privacy Policy for more details.\n',
      order: 12,
    },
  ];
  async faqSeeder(FAQ: any): Promise<boolean> {
    for (const data of FAQ) {
      await this.faqRepoService.createFaq(data);
    }
    return true;
  }

  async seed(): Promise<boolean> {
    const data = this.FAQ;
    for (const faq of data) {
      await this.faqRepoService.createFaq(faq);
    }
    return true;
  }
}
